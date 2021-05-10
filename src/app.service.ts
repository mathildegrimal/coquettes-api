import { HttpService } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  createMessage(message): Observable<Object> {
    return this.http.post(
      'https://discord.com/api/webhooks/841432524526059590/qkSb1Hv08-2HpNceveLZZrXFnUDrVlMDmsVt4ehPaBSbLTP_hv1VHZ2iw0H5oIwXrTqc',
      {
        content: message.content,
      },
    );
  }
}
