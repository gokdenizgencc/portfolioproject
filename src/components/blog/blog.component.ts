import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blog: Blog | null = null;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {

    const savedBlog = this.getBlogDataFromStorage();
    if (savedBlog) {
      this.blog = savedBlog; 
    } else {
 
      this.blog = this.blogService.getBlogData();
      if (this.blog) {
        this.setBlogData(this.blog); 
      }
    }
  }

  setBlogData(blog: Blog): void {
    localStorage.setItem('blogData', JSON.stringify(blog));  
  }

  getBlogDataFromStorage(): Blog | null {
    const blogData = localStorage.getItem('blogData');
    return blogData ? JSON.parse(blogData) : null;
  }
  ngOnDestroy(): void {
    localStorage.removeItem('blogData'); // Blog verisini localStorage'tan sil
  }
}