
// Hostname of the DDF web interface.
export const DDF_HOSTNAME = window.DDF_HOSTNAME || window.location.hostname;

// Base URL of the DDF server (api).
export const DDF_SERVER_URL = window.DDF_SERVER_URL || `http://${DDF_HOSTNAME}:1977`;

// Base URL of the DDF preview (devserver iframe).
export const DDF_PREVIEW_URL = window.DDF_PREVIEW_URL || `http://${DDF_HOSTNAME}:1979`;

// Convenience container.
export default {
    DDF_HOSTNAME,
    DDF_SERVER_URL,
    DDF_PREVIEW_URL,
};