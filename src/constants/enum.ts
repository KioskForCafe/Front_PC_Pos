export enum Navigation {
    AuthenticationView = 'AuthenticationView',
    Order = 'Order',
    CustomMenu = 'CustomMenu',
    OrderLog = 'OrderLog',
    AnalysisView = 'AnalysisView',
    Store = 'Store',
    PostStoreView = 'PostStoreView',
    PatchStoreView = 'PatchStoreView',
    PostMenu = 'PostMenu',
    PostCategory = 'PostCategory',
    PatchCategory = 'PatchCategory'
}

export enum OrderState{
    WAITING = 'Waiting',
    CONFIRM = 'Confirm',
    COMPLETE = 'Complete',
    REFUND = 'Refund',
    REJECT = 'Reject'
}