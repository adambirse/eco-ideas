// General Variables

variable "service_account" {
  type = "string"
  description = "GCP service account location."
}

variable "project_name" {
  type = "string"
  description = "project name for the GCP Cluster."
}

// GCP Variables
variable "gcp_cluster_count" {
  type = "string"
  description = "Count of cluster instances to start."
}

variable "cluster_name" {
  type = "string"
  description = "Cluster name for the GCP Cluster."
}

variable region {
  type = "string"
  description = "Region to use."
  default = "europe-west2"
}

variable zone {
  type = "string"
  description = "zone to use."
  default = "europe-west2-a"
}

variable network {
  type = "string"
  description = "private network to use"
}

variable database_version {
  type = "string"
  default = "MYSQL_5_7"
}

variable database_tier {
  type = "string"
  default = "db-f1-micro"
}

variable database_name {
  type = "string"
  default = "eco"
}

variable database_charset {
  type = "string"
  default = "utf8"
}

variable database_user {
  type = "string"
  default = "test"
}

variable database_password {
  type = "string"
  default = "test"
}

// GCP Outputs
output "sql_private_ip" {
  value = google_sql_database_instance.eco-ideas.private_ip_address
}

output "static_ip" {
  value = google_compute_global_address.default.address
}
