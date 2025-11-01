use axum::{Json, Router, routing::get, serve};
use serde::Serialize;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(handler));

    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    serve(listener, app).await.unwrap();
}

#[derive(Serialize)]
struct User {
    name: String,
}

async fn handler() -> Json<User> {
    Json(User {
        name: "hello".to_string(),
    })
}
