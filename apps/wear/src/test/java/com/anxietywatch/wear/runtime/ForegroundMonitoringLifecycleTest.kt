package com.anxietywatch.wear.runtime

import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ForegroundMonitoringLifecycleTest {
    @Test
    fun `quick stop and start allows exactly one new monitoring session`() {
        val lifecycle = ForegroundMonitoringLifecycle()

        assertTrue(lifecycle.onStart())
        assertFalse(lifecycle.onStart())
        lifecycle.onStop()
        assertTrue(lifecycle.onStart())
        assertFalse(lifecycle.onStart())
    }
}
