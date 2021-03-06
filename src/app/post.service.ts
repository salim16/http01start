import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators'
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {

    // postsTracker = new Subject<Post[]>();
    // we do not do it this way in case of HTTPS

    error = new Subject<string>();

    constructor(private http: HttpClient) {

    }

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content };
        this.http.post<{ name: string }>('https://ng-complete-guide-57894.firebaseio.com/posts.json',
        postData, 
        {
          observe: "response"
        }) // try removing the observe part, then it only gives the default javascript result withot extra info
        // observe : "response" gives back complete response along with header etc.
        // observe : "body" is the default value
        .subscribe(responseData => {
            console.log(responseData);
            console.log(responseData.body); // it will give the javascript response
            // this.fetchPosts();
        }, error => {
          this.error.next(error.message);
        });
    }

    fetchPosts() {
        /*this.http.get('https://ng-complete-guide-57894.firebaseio.com/posts.json')
        .pipe(
          map((responseData: { [key: string]: Post})=> {
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                // postsArray.push(responseData[key]);
                postsArray.push({...responseData[key], id: key}); 
              }
            }
            return postsArray;
          })
        )
        .subscribe(posts => {
          console.log(posts);
        })*/
    
         // We mention the expected return type in the get method of http only 
         // and not in the responseData .

        /* this.http.get<{ [key: string]: Post }>
                  ('https://ng-complete-guide-57894.firebaseio.com/posts.json')
        .pipe(
          map(responseData => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                // postsArray.push(responseData[key]); 
                // So here we are storing the javascript objects which were earlier values
                // corresponding to keys like M5gc7NRop1mg-mxb8UR  and M5gcj6seH1yPLBjHO_x etc as below
                // So now the array is like :
                // 0: {content: "good man", title: "Gandhi"}
                // 1: {content: "good man", title: "Gandhi"}
                // 2: {content: "qiudhqie", title: "yuahd"}
                // 3: {content: "asodh", title: "jagd"}
    
                postsArray.push({...responseData[key], id: key}); 
                // Now this new sytax takes key as the value and maps it to the new key which is id,
                // and now the javascript object also has an id which we can use.
                // 0: {content: "good man", title: "Gandhi", id: "-M5gc7NRop1mg-mxb8UR"}
                // 1: {content: "good man", title: "Gandhi", id: "-M5gcj6seH1yPLBjHO_x"}
                // 2: {content: "qiudhqie", title: "yuahd", id: "-M5pcNkmj7tlfR2n-iKM"}
                // 3: {content: "asodh", title: "jagd", id: "-M5pyya3AWrYcnjrg6I6"}
              }
            }
            return postsArray;
          })
        ) // Comment the pipe method and we were getting javascript object
        // like 
        // {"-M5gc7NRop1mg-mxb8UR":{"content":"good man","title":"Gandhi"},
        // "-M5gcj6seH1yPLBjHO_x":{"content":"good man","title":"Gandhi"},
        // "-M5pcNkmj7tlfR2n-iKM":{"content":"qiudhqie","title":"yuahd"},
        // "-M5pyya3AWrYcnjrg6I6":{"content":"asodh","title":"jagd"}}
        .subscribe(posts => {
            console.log(posts);
            // this.postsTracker.next(posts); we do not do it this way in case of https
        }) */

        // key is of string type and value is of javascript object of Post type


        // Now we only return the observable and do not subscribe here.

        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');
        return this.http.get<{ [key: string]: Post }>
                  ('https://ng-complete-guide-57894.firebaseio.com/posts.json',
                  {
                    /*headers: new HttpHeaders(
                      {"Custome-Header1" : "Hello", "Custome-Header2" : ["Bye!", "TakeCare!"]}
                    ), */
                    headers: {"Custome-Header1" : "Hello", "Custome-Header2" : ["Bye!", "TakeCare!"]},
                    
                    // params: new HttpParams().set('print', 'pretty')
                    // params: searchParams,
                    params: {"print": "pretty", "list": ["2","3","5"]}
                  })
        .pipe(
          map(responseData => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                // postsArray.push(responseData[key]); 
                postsArray.push({...responseData[key], id: key}); 
              }
            }
            return postsArray;
          }),
          catchError(errorRes => {
            // Send to analytics server
            return throwError(errorRes);
          })
        );
    }

    deletePosts() {
        return this.http.delete("https://ng-complete-guide-57894.firebaseio.com/posts.json",
        {
          observe: "events",
          responseType: "json"
        })
        .pipe(
          tap(event => {
            console.log(event);
            // make the observe as "events" to achive more granular request and 
            // control it on every step, to update the UI accordingly 
            if(event.type === HttpEventType.Sent) {
              // ..
            }
            if(event.type === HttpEventType.Response) {
              console.log(event.body);
            }
          })
        );
    }
}