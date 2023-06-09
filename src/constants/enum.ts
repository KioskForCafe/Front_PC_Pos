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
    PatchCategory = 'PatchCategory',
    AlarmView = 'AlarmView',
    Point = 'Point'
}

export enum OrderState{
    WAITING = 'Waiting',
    CONFIRM = 'Confirm',
    COMPLETE = 'Complete',
    REFUND = 'Refund',
    REJECT = 'Reject'
}

export enum AlarmMessage {
    MENU_REGISTER = "메뉴가 등록되었습니다.",
    MENU_MODIFIED = "메뉴가 수정되었습니다.",
    MENU_REMOVED = "메뉴가 삭제되었습니다.",
    CATEGORY_REGISTER = "카테고리가 등록되었습니다.",
    CATEGORY_MODIFIED = "카테고리가 수정되었습니다.",
    CATEGORY_REMOVED = "카테고리가 삭제되었습니다."
}