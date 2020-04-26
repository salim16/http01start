import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //this.http.post('https://ng-complete-guide-57894.firebaseio.com/posts.json', postData)
    this.http.post<{name: string}>('https://ng-complete-guide-57894.firebaseio.com/posts.json', postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    /*this.http.get('https://ng-complete-guide-57894.firebaseio.com/posts.json')
    .pipe(
      map((responseData: { [key: string]: Post})=> {
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
    })*/

    this.http.get<{ [key: string]: Post }>
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
    })
  }
}
