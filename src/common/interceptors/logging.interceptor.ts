import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    const now = Date.now();
    this.logger.log(`Incoming -> ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Handled -> ${method} ${url} (${Date.now() - now}ms)`,
          ),
        ),
      );
  }
}
