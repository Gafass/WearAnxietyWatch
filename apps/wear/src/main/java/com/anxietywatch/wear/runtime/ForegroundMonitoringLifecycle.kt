package com.anxietywatch.wear.runtime

internal class ForegroundMonitoringLifecycle {
    private var started = false

    fun onStart(): Boolean {
        if (started) return false
        started = true
        return true
    }

    fun onStop() {
        started = false
    }
}
