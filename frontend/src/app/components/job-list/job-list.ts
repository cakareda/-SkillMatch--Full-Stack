import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { UserSkillService } from '../../services/user-skill.service'; 
import { Job } from '../../model/job.model';
import { Application } from '../../model/application.model';
import { Observable, Subscription } from 'rxjs'; 

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  
  // 🔥 HATA 2 DÜZELTMESİ:
  // Dosya adların .component.html değil
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css']
})
export class JobListComponent implements OnInit, OnDestroy {
  // ... (KODUN GERİ KALANI AYNI KALIR) ...
  // ... (calculateMatchPercentage, ngOnInit, vb.) ...
  
  jobs: Job[] = [];
  isAdmin$: Observable<boolean>;
  isModalOpen = false;
  selectedJob: Job | null = null;
  application: Application = { name: '', email: '', message: '', jobTitle: '' };
  currentUserSkills: string[] = [];
  private skillsSubscription: Subscription | null = null;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private userSkillService: UserSkillService 
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(
      (data) => {
        // Hata 1 (postedDate) düzeldiği için burası artık hata vermeyecek
        this.jobs = data; 
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );

    this.skillsSubscription = this.userSkillService.userSkills$.subscribe(
      (skills) => {
        this.currentUserSkills = skills.map(skill => skill.toLowerCase());
      }
    );
  }

  calculateMatchPercentage(jobSkills: string[]): number {
    if (this.currentUserSkills.length === 0 || !jobSkills || jobSkills.length === 0) {
      return 0;
    }
    const jobSkillsLower = jobSkills.map(skill => skill.toLowerCase());
    const matchCount = jobSkillsLower.filter(skill => 
      this.currentUserSkills.includes(skill)
    ).length;
    const percentage = (matchCount / jobSkills.length) * 100;
    return Math.round(percentage);
  }

  ngOnDestroy(): void {
    if (this.skillsSubscription) {
      this.skillsSubscription.unsubscribe();
    }
  }

  openModal(job: Job): void {
    this.selectedJob = job;
    this.isModalOpen = true;
    this.application = { name: '', email: '', message: '', jobTitle: job.title };
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedJob = null;
    this.application = { name: '', email: '', message: '', jobTitle: '' };
  }

  submitApplication(): void {
    if (!this.selectedJob) return;
    this.jobService.addApplication(this.application).subscribe({
      next: (response) => {
        console.log('Başvuru başarılı:', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Başvuru hatası:', error);
      }
    });
  }

  testAddJob(): void {
    console.log('Admin: Add Job tıklandı');
  }
  testUpdateJob(jobId: number | undefined): void {
    console.log('Admin: Update Job tıklandı:', jobId);
  }
  testDeleteJob(jobId: number | undefined): void {
    console.log('Admin: Delete Job tıklandı:', jobId);
  }
}