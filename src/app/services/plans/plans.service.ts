import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Plan} from '../../models/plans.model';
import {map, Observable, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);

  public getCurrentUserPlanDetails(): Observable<Plan> {
    return this.buildUrl("/details").pipe(
      switchMap(url => this.http.get<Plan>(url))
    );
  }

  public changeUserPlan(planId: string): Observable<Plan> {
    return this.buildUrl("/change").pipe(
      switchMap(url => this.http.post<Plan>(url, {
        newPlanId: planId
      }))
    );
  }

  public getAvailablePlans(): Observable<Plan[]> {
    console.log("Fetching available plans");

    return this.buildUrl("/available").pipe(
      switchMap(url => this.http.get<Plan[]>(url))
    );
  }

  private buildUrl(endpoint: string): Observable<string> {
    return this.authService.getCurrentUser().pipe(
      map(user => `/plans/${user.id}${endpoint}`)
    );
  }
}
