import { AxiosInstance } from 'axios';
import Toastconfig from 'assets/toast';
import { ListEventType, EventType } from 'app/Models';
export class EventGateway {
  private restConnector: AxiosInstance;

  constructor(restConnector: AxiosInstance) {
    this.restConnector = restConnector;
  }
  async getListEvent(page?: number): Promise<ListEventType | undefined> {
    try {
      const {
        data: { data },
      } = await this.restConnector.get('/web-app/event', {
        params: {
          keySort: 'createdAt',
          page: page,
        },
      });
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error.response.data.errorList);
      Toastconfig.error(error.response.data.errorList[0]);
      return;
    }
  }
  async getEventDetal(id: string): Promise<EventType | undefined> {
    try {
      const {
        data: { data },
      } = await this.restConnector.get(`/web-app/event/${id}`);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error.response.data.errorList);
      Toastconfig.error(error.response.data.errorList[0]);
      return;
    }
  }
}
