export abstract class BusyViewModel {
    isBusy: boolean;

    protected setBusy<T>(promise: ng.IPromise<T>): ng.IPromise<T> {
        this.isBusy = true;
        console.log('set buzy: promise');
        console.log(promise);

        promise.finally(() => { this.isBusy = false; });
        return promise;
    }
}