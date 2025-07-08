// redux/contact/contactSelectors.js

// Selector: lấy toàn bộ danh sách liên hệ
export const selectContacts = (state) => state.contact.contacts;

// Selector: trạng thái loading
export const selectLoading = (state) => state.contact.loading;

// Selector: lỗi
export const selectError = (state) => state.contact.error;
