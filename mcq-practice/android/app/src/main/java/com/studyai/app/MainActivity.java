package com.studyai.app;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        // Ensure webview content respects system status bar & does not get drawn behind it
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
    }
}
