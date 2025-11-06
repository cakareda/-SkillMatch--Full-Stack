import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs'; 
import { UserSkillService } from './user-skill.service'; 

// typescript interface defining the shape of a job object
export interface Job {
  id?: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  requiredSkills: string[];
  matchPercentage?: number; // calculated on the frontend
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  // base url for the spring boot backend
  private apiUrl = 'http://localhost:8080'; 

  // inject http client and the user skill service
  constructor(private http: HttpClient, private UserSkillService: UserSkillService) {} 

  // get all jobs and enrich them with a match percentage
  getJobs(): Observable<Job[]> {
    // get the latest user skills first
    return this.UserSkillService.userSkills$.pipe(
      // use switchmap to cancel previous requests and use the skills value
      switchMap((userSkills: string[]) => {
        // once skills are available, fetch the jobs
        return this.http.get<Job[]>(`${this.apiUrl}/jobs`).pipe(
          // use map to transform the job array
          map(jobs => this.matchJobsWithSkills(jobs, userSkills))
        );
      })
    );
  }
  
  // private helper to calculate match percentage for each job
  private matchJobsWithSkills(jobs: Job[], userSkills: string[]): Job[] {
    // if user has no skills, return all jobs with 0% match
    if (!userSkills || userSkills.length === 0) {
      return jobs.map(job => ({ ...job, matchPercentage: 0 }));
    }

    // convert user skills to lowercase once for efficiency
    const userSkillsLower = userSkills.map(s => s.toLowerCase()); 

    // process each job
    return jobs.map(job => {
      const requiredCount = job.requiredSkills ? job.requiredSkills.length : 0;
      // if job has no required skills, it's a 0% match
      if (requiredCount === 0) {
        return { ...job, matchPercentage: 0 };
      }

      let matchedCount = 0;
      // perform case-insensitive comparison
      for (const requiredSkill of job.requiredSkills) {
        if (userSkillsLower.includes(requiredSkill.toLowerCase())) {
          matchedCount++;
        }
      }

      // calculate and round the percentage
      const percentage = Math.round((matchedCount / requiredCount) * 100);
      return { ...job, matchPercentage: percentage };
    });
  }
  
  // --- standard crud operations ---

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }

  updateJob(id: number, jobData: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/jobs/${id}`, jobData);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/jobs/${id}`);
  }

  addJob(jobData: Job): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/jobs`, jobData);
  }

  // --- application related methods ---

  // submit a new job application
  addApplication(applicationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/applications`, applicationData);
  }

  // get all job applications (for admin)
  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/applications`);
  }
}