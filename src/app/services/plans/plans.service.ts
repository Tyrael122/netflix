import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Plan, PLANS, Plans} from '../../models/plans.model';
import {createNetflixError, NetflixErrorCodes} from '../../models/errors.model';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private authService = inject(AuthService);

  public getCurrentUserPlanDetails(): Plan {
    return this.getDefaultPlan(); // Return default plan if no plan is assigned

    // const user = this.authService.getCurrentUser();
    // if (!user || user.isGuest) {
    //   return this.getDefaultPlan();
    // }
    //
    // const planId = user.planId;
    // if (!planId) {
    //   console.warn(`User ${user.id} has no plan assigned, returning default plan.`);
    //   return this.getDefaultPlan(); // Return default plan if no plan is assigned
    // }
    //
    // const plan = this.getPlanDetailsById(planId);
    // if (!plan) {
    //   console.error(`Plan with ID ${planId} not found for user ${user.id}`);
    //   return this.getDefaultPlan(); // Return default plan if the specified plan is not found
    // }
    //
    // return plan;
  }

  public changeUserPlan(planId: string): Observable<Plan> {
    return of(this.getDefaultPlan());

    // const user = this.authService.getCurrentUser();
    //
    // console.log(user);
    //
    // if (user.isGuest) {
    //   return throwError(() => createNetflixError(
    //     NetflixErrorCodes.PLAN_CHANGE_NOT_ALLOWED,
    //     `Guest users cannot change plans. Please log in to change your plan.`
    //   ));
    // }
    //
    // const plan = this.getPlanDetailsById(planId);
    // if (!plan) {
    //   throw this.createPlanDataNotFoundException(planId);
    // }
    //
    // user.planId = plan.id.toString();
    // console.log(`User ${user.id} changed to plan: ${plan.name}`);
    // return of(plan);
  }

  public getAvailablePlans(): Plan[] {
    return PLANS;
  }

  private getDefaultPlan(): Plan {
    return this.getPlanDetailsById(Plans.Free);
  }

  private getPlanDetailsById(planId: string): Plan {
    for (const plan of this.getAvailablePlans()) {
      if (plan.id === planId) {
        return plan;
      }
    }

    throw this.createPlanDataNotFoundException(planId);
  }

  private createPlanDataNotFoundException(planId: string) {
    console.error(`Plan with ID ${planId} not found.`);

    return createNetflixError(
      NetflixErrorCodes.PLAN_DATA_NOT_FOUND,
      `Plan details not found. Please contact support.`
    );
  }
}
