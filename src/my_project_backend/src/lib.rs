use std::cell::RefCell;

thread_local! {
    static CHAT: RefCell<Vec<String>> = RefCell::new(Vec::new());
}

#[ic_cdk::update]
fn save_chat(input_chat: String) {
    CHAT.with(|chat| chat.borrow_mut().push(input_chat))
}

#[ic_cdk::query]
fn get_chat() -> Vec<String> {
    CHAT.with(|chat| chat.borrow().clone())
}

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

// fn moja_nowa_funkcja() {
//     print!("Hello, World!");
// }