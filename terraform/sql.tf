resource "random_id" "id" {
  byte_length = 4
  prefix = "sql-${terraform.workspace}-"
}

resource "google_sql_database_instance" "eco-ideas" {
  name = random_id.id.hex
  database_version = "MYSQL_5_7"
  region = var.region

  settings {
    tier = "db-f1-micro"
    ip_configuration {
      ipv4_enabled = "false"
      private_network = var.network
    }
  }
}

resource "google_sql_database" "database" {
  name = "eco"
  instance = google_sql_database_instance.eco-ideas.name
  charset = "utf8"
}

resource "google_sql_user" "app-user" {
  name = "test"
  instance = google_sql_database_instance.eco-ideas.name
  host = "%"
  password = "test"
}
