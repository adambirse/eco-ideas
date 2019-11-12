
resource "google_container_cluster" "gcp_kubernetes" {
  name = var.cluster_name
  location = var.zone
  initial_node_count = var.gcp_cluster_count
  network = var.network


  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    tags = [
      "dev",
      "work"]
  }
}