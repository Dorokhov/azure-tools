export abstract class BusyViewModel {
    isBusy: boolean;

    protected setBusy<T>(promise: ng.IPromise<T>): ng.IPromise<T> {
        this.isBusy = true;
        promise.finally(() => { this.isBusy = false; });
        return promise;
    }
}