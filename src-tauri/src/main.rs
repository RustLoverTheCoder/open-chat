#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{TitleBarStyle, WindowBuilder};

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      WindowBuilder::new(app, "main", tauri::WindowUrl::App("index.html".into()))
        .inner_size(320.0, 640.0)
        .visible(false)
        .title("")
        .hidden_title(true)
        .min_inner_size(320.0, 640.0)
        .title_bar_style(TitleBarStyle::Overlay)
        .build()?;

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
