import { EventGateway } from './Gateways/EventGateway';
export class EventService {
  private eventGateway: EventGateway;

  constructor(eventGateway: EventGateway) {
    this.eventGateway = eventGateway;
  }

  async getListEvent(page?: number) {
    return this.eventGateway.getListEvent(page);
  }

  async getEventDetal(_id: string) {
    return this.eventGateway.getEventDetal(_id);
  }
}
