import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { BlogDto } from '../models/blogDto';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blog: Blog | null = null;
  private blogs: Blog[] | null = null;
  constructor(private httpClient:HttpClient) { }
  apiUrl="http://localhost:46772/api/";
  addblog(blog:BlogDto): Observable<ResponseModel>{
    var result=this.httpClient.post<ResponseModel>("http://localhost:46772/api/Blogs/addBlog",blog);
    return result;
  }

  getAllBlogById(){
    let path="http://localhost:46772/api/Blogs/getAllByUserId";

    return this.httpClient.get<ListResponseModel<Blog>>(path);
  }
  updateBlogById(blog:BlogDto):Observable<SingleResponseModel<BlogDto>>{
    let path="http://localhost:46772/api/Blogs/updateBlog";
    return this.httpClient.post<SingleResponseModel<BlogDto>>(path,blog);
  }
 deleteBlog(blog:BlogDto): Observable<ResponseModel>{
      var result=this.httpClient.post<ResponseModel>(this.apiUrl+"Blogs/delete",blog);
      return result;
    }

  setBlogsData(blogs:Blog[]):void{
    this.blogs=blogs;
  }
  setBlogData(blog: Blog): void {
    this.blog = blog;
  }
  getBlogData(): Blog | null {
    return this.blog;
  }
  getBlogsData(): Blog[] | null {
    return this.blogs;
  }
}
