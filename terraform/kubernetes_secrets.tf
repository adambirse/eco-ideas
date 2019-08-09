resource "kubernetes_secret" "config" {
  metadata {
    name = "config"
  }

  data = {
    user = google_sql_user.app-user.name
    password = google_sql_user.app-user.password
    database_host = google_sql_database_instance.eco-ideas.private_ip_address
    database_name = google_sql_database.database.name
  }

  type = "kubernetes.io/basic-auth"

  depends_on = [
    google_container_cluster.gcp_kubernetes,
    google_sql_user.app-user,
    google_sql_database_instance.eco-ideas
  ]
}