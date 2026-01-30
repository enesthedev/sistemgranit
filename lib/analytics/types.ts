export interface PageViewData {
  visitor_id: string;
  session_id: string;
  page_path: string;
  page_title?: string;
  referrer?: string;
  referrer_domain?: string;
  user_agent?: string;
  device_type?: string;
  browser?: string;
  browser_version?: string;
  os?: string;
  os_version?: string;
  screen_width?: number;
  screen_height?: number;
  viewport_width?: number;
  viewport_height?: number;
  timezone?: string;
  language?: string;
}

export interface SessionData {
  id: string;
  visitor_id: string;
  started_at: string;
  ended_at?: string;
  duration_seconds?: number;
  page_count?: number;
  entry_page?: string;
  exit_page?: string;
  referrer?: string;
  referrer_domain?: string;
  is_bounce?: boolean;
  device_type?: string;
  browser?: string;
  os?: string;
}

export interface EventData {
  visitor_id: string;
  session_id: string;
  event_name: string;
  event_data?: Record<string, unknown>;
  page_path?: string;
}

export interface DeviceInfo {
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
}
