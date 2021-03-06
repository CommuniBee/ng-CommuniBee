import {Injectable} from '@angular/core';
import {BackendModelService} from '../basic-model.service';
import {BackendHttpService} from '../backend-http.service';
import {VolunteeringBaseModel, VolunteeringRequestOfferBase} from '../common-models/volunteering-request-offer-base';
import {ErrorHandlerService} from '../../error-handler/error-handler.service';

const path = 'volunteering-requests';

@Injectable({
  providedIn: 'root',
})
export class VolunteeringRequestsService extends BackendModelService<VolunteeringRequestOfferBase, VolunteeringBaseModel> {

  constructor(private backendHttpService: BackendHttpService) {
    super(path, backendHttpService);
  }

  async getUnmatched() {
    try {
      return await this.backendHttp.get(`${path}`, 'isMatched=false');
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }

  async setMatched(eventId: string, isMatched: boolean) {
    try {
      return await this.backendHttp.put(`${path}/${eventId}`, {isMatched: `${isMatched}`});
    } catch (e) {
      ErrorHandlerService.handleError(e);
    }
  }
}
