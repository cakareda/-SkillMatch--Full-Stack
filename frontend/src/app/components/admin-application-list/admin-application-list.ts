import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-admin-application-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-application-list.html',
  styleUrls: ['./admin-application-list.css']
})
export class AdminApplicationListComponent implements OnInit {
  applications: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    this.jobService.getApplications().subscribe({
      next: (data) => this.applications = data,
      error: (err) => console.error('Error fetching applications:', err)
    });
  }
}
