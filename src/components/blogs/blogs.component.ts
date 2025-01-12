import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { UserService } from '../../services/user.service';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  dataLoaded:Boolean
  blogs:Blog[];
    constructor(private blogService:BlogService,private toastrService:ToastrService,private router:Router){
  
    }
  ngOnInit():void{
    this.getBlogs();
  }
  getBlogs(){
    this.blogService.getAllBlogById(1).subscribe(response=>{
      this.blogs=response.data;
      this.dataLoaded=true;


    },  responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    }
  );
  }
  goToBlogDetail( blog: Blog){
    this.blogService.setBlogData(blog);
    this.router.navigate([`/blogs/${blog.blogId}`]);
  }
}
