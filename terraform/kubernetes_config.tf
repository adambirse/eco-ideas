resource "kubernetes_config_map" "server_address" {
  metadata {
    name = "server-config"
  }

  data = {
    server_address = google_compute_global_address.default.address
    server_port = 80
    server_scheme = "http"
  }
}