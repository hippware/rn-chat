package com.hippware.android.tinyrobot;

import java.util.List;
import android.content.Context;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.media.AudioAttributes;
import android.os.Build;
import android.util.Log;

public class NotificationChannelHelper {
    private static final String TAG = "tinyrobot/NotificationChannelHelper";

    // A list of obsolete channels that should be deleted
    private static String[] obsoleteChannels = {
        // RNBGL injects its own channel.
        // Remove the production one so it is not user-visible.
        "com.hippware.android.tinyrobotTSLocationManager"
    };

    private static NotificationManager manager;

    public static void init(Context context) {
        // Notification channels API only exists for API 26+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            createChannels();
            deleteChannels();

            // debug
            // dumpChannels();
        }
    }

    private static void createChannels() {
        // AFAICT, these are the default audio attributes for notification channels.
        AudioAttributes audioAttr = new AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_NOTIFICATION)
            .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
            .build();

        // ToDo: getString(R.string.??) for channel names

        // Creation is sort-of idempotent.
        // Channels can be created even if they already exist.
        // New settings just get ignored.
        NotificationChannel myDefault = new NotificationChannel("default", "Miscellaneous", NotificationManager.IMPORTANCE_DEFAULT);
        myDefault.setSound(null, audioAttr);
        manager.createNotificationChannel(myDefault);

        NotificationChannel chat = new NotificationChannel("chat", "Messages", NotificationManager.IMPORTANCE_DEFAULT);
        manager.createNotificationChannel(chat);

        NotificationChannel geofence = new NotificationChannel("geofence", "Entry/Exit", NotificationManager.IMPORTANCE_DEFAULT);
        geofence.setSound(null, audioAttr);
        manager.createNotificationChannel(geofence);
    }

    private static void deleteChannels() {
        // Channel deletion is idempotent so just keep deleting them 
        for (String id: obsoleteChannels) {
            manager.deleteNotificationChannel(id);
        }
    }

    private static void dumpChannels() {
        for (NotificationChannel channel: manager.getNotificationChannels()) {
            Log.i(TAG, "Channel: " + channel);
        }
    }
}
