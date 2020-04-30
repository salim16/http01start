import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  subscription: Subscription

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.subscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    // this.postService.fetchPosts();

    /* this.postService.postsTracker.subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
      }
    ) */

    // We do not do it this way in case of https, rather we return the http observable 
    // and instead subscribe to the http observable;

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts: Post[]) => {
        console.log(posts);
        this.loadedPosts = posts;
        this.isFetching = false;
      }, error => {
        this.isFetching = false;
        this.error = error.message;
      });
  }

  // In case of create post, we subscribe in the component itself,
  // beacuse we do not have to care abput the reposnse in this case.
  // and we also dot have to perform any logic with our component properties
  onCreatePost(postData: Post) {
    // Send Http request
    //this.http.post('https://ng-complete-guide-57894.firebaseio.com/posts.json', postData)
    /*this.http.post<{name: string}>('https://ng-complete-guide-57894.firebaseio.com/posts.json',
     postData)
      .subscribe(responseData => {
        console.log(responseData);
      });*/
      this.postService.createAndStorePost(postData.title, postData.content);
      this.onFetchPosts(); // This won't work because subscribe method is still working and 
      // the post is not yet created and this method would get called
  }

  onFetchPosts() {
    //this.fetchPosts();
    // this.postService.fetchPosts();
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts: Post[]) => {
        console.log(posts);
        this.loadedPosts = posts;
        this.isFetching = false;
      }, error => {
        this.error = error.message;
        this.isFetching = false;
        console.log(error);
      });
  }

  onClearPosts() {
    // subscribe will only run when everything is alright on the server side.
    this.postService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    )
  }

  private fetchPosts() {
  //  this.isFetching = true;
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

            postsArray.push({...responseData[key], id: key}); 
          }
        }
        return postsArray;
      })
    )
    .subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
      console.log(posts);
    }) */
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
