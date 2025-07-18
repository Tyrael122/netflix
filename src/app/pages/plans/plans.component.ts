import {Component, inject, OnInit} from '@angular/core';
import {PlansService} from '../../services/plans/plans.service';
import {NavbarContainerComponent} from '../../components/navbar-container/navbar-container.component';
import {Plan, PlanFeatures} from '../../models/plans.model';
import {
  LoadingSpinnerIndicatorComponent
} from '../../components/loading-spinner-indicator/loading-spinner-indicator.component';
import {NetflixIconComponent} from '../../components/netflix-icon/netflix-icon.component';
import {ToastService} from '../../services/toast/toast.service';
import {isNetflixErrorWithCode, NetflixErrorCodes} from '../../models/errors.model';

@Component({
  selector: 'netflix-plans',
  imports: [
    NavbarContainerComponent,
    LoadingSpinnerIndicatorComponent,
    NetflixIconComponent
  ],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {

  plans: Plan[] = [];
  currentPlan?: Plan;

  private plansService = inject(PlansService);
  private toastService = inject(ToastService);

  isLoading: boolean = false;

  ngOnInit() {
    this.plans = this.plansService.getAvailablePlans();
    this.currentPlan = this.plansService.getCurrentUserPlanDetails();
  }

  switchPlan(id: string) {
    this.plansService.changeUserPlan(id).subscribe({
      next: plan => this.currentPlan = plan,
      error: err => {
        if (isNetflixErrorWithCode(err, NetflixErrorCodes.PLAN_CHANGE_NOT_ALLOWED)) {
          this.toastService.showToast('Plan change not allowed, please log in to change your plan.');
        }
      }
    });
  }

  getFeatureList(features: PlanFeatures): string[] {
    const featureList: string[] = [];

    // Playlist creation
    if (features.playlistCreation.limit === Infinity) {
      featureList.push('Unlimited playlists');
    } else {
      featureList.push(`Create up to ${features.playlistCreation.limit} playlists`);
    }

    // Reviews
    if (features.reviews.canWrite && features.reviews.canReply) {
      featureList.push('Write reviews and reply to others');
    } else if (features.reviews.canWrite) {
      featureList.push('Write reviews (no replies)');
    } else if (features.reviews.canView) {
      featureList.push('Read reviews only');
    }

    // Search
    if (features.search.type === 'advanced') {
      featureList.push('Advanced search with filters & sorting');
    } else {
      featureList.push('Basic search');
    }

    // Additional features
    if (features.canSeeSimilarMovies) {
      featureList.push('"Similar movies" recommendations');
    }

    if (features.canWatchTrailers) {
      featureList.push('Watch movie trailers');
    }

    return featureList;
  }
}
