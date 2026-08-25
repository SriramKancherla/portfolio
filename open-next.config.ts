import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Portfolio is mostly static — skip R2 incremental cache.
export default defineCloudflareConfig({});
