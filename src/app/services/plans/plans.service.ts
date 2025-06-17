import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Plan, PLANS, Plans} from '../../models/plans.model';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private authService = inject(AuthService);

  public getCurrentUserPlanDetails(): Plan | null {
    const user = this.authService.getCurrentUser();
    if (!user || user.isGuest) {
      return this.getDefaultPlan();
    }

    const planId = user.planId;
    if (!planId) {
      console.warn(`User ${user.credentials?.username} has no plan assigned, returning default plan.`);
      return this.getDefaultPlan(); // Return default plan if no plan is assigned
    }

    const plan = this.getPlanDetailsById(planId);
    if (!plan) {
      console.error(`Plan with ID ${planId} not found for user ${user.credentials?.username}`);
      return this.getDefaultPlan(); // Return default plan if the specified plan is not found
    }

    return plan;
  }

  public changeUserPlan(planId: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user || user.isGuest) {
      return false; // Cannot change plan for guest users
    }


    const plan = this.getPlanDetailsById(planId);
    if (!plan) {
      return false; // Plan not found
    }

    user.planId = plan.id.toString();
    console.log(`User ${user.credentials?.username} changed to plan: ${plan.name}`);
    return true;
  }

  public getAvailablePlans(): Plan[] {
    return PLANS;
  }

  private getDefaultPlan(): Plan | null {
    return this.getPlanDetailsById(Plans.Free);
  }

  private getPlanDetailsById(planId: string): Plan | null {
    for (const plan of this.getAvailablePlans()) {
      if (plan.id === planId) {
        return plan;
      }
    }

    console.warn(`Plan with ID ${planId} not found, returning null.`);
    return null;
  }
}
