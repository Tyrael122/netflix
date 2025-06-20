import {Component, inject, OnInit} from '@angular/core';
import {PlansService} from '../../services/plans/plans.service';
import {NavbarContainerComponent} from '../../components/navbar-container/navbar-container.component';
import {Plan} from '../../models/plans.model';
import {
  LoadingSpinnerIndicatorComponent
} from '../../components/loading-spinner-indicator/loading-spinner-indicator.component';
import {NetflixIconComponent} from '../../components/netflix-icon/netflix-icon.component';

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
  currentPlan!: Plan;

  private plansService = inject(PlansService);
  isLoading: boolean = false;

  ngOnInit() {
    this.plans = this.plansService.getAvailablePlans();
    this.currentPlan = this.plansService.getCurrentUserPlanDetails();
  }

  switchPlan(id: string) {
    if (this.plansService.changeUserPlan(id)) {
      this.currentPlan = this.plansService.getCurrentUserPlanDetails();
    }
  }

  getFeatureList(features: any): string[] {
    const featureList: string[] = [];
    if (features.playlistCreation) {
      featureList.push(`Playlist Creation: ${features.playlistCreation.limit} playlists`);
    }
    if (features.reviews) {
      featureList.push(`Reviews: ${features.reviews.canView ? 'Can View' : 'Cannot View'}, ${features.reviews.canWrite ? 'Can Write' : 'Cannot Write'}, ${features.reviews.canReply ? 'Can Reply' : 'Cannot Reply'}`);
    }
    if (features.search) {
      featureList.push(`Search: ${features.search.type}, Filters: ${features.search.hasFilters ? 'Yes' : 'No'}, Sorting: ${features.search.hasSorting ? 'Yes' : 'No'}`);
    }
    if (features.canSeeSimilarMovies) {
      featureList.push('Can See Similar Movies');
    }
    if (features.trailers) {
      featureList.push('Trailers Available');
    }
    return featureList;
  }
}
