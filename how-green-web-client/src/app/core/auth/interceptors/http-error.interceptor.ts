
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from '../services/auth/error.service';
import { LoggingService } from '../services/auth/logging.service';
import { NotificationService } from '../services/auth/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;
        if (error instanceof HttpErrorResponse) {

            // Server error
            message = errorService.getServerErrorMessage(error);

            if (error.status === 401) {
                // refresh token
                notifier.showError(message);
            }
            if (error.status === 400) {
                let errorString = error as any as string;
                notifier.showError(errorString);
            }

            if (error.status === 403) {
                message = "Access is forbidden";
                notifier.showError(message);
            }
            else {
                return notifier.showError(message);
            }
        }

    }

}
