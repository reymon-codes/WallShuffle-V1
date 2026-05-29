import { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Play, Square, Settings, Image as ImageIcon, Star, History, 
  Plus, Trash2, Loader2, Download, Check, ChevronRight, Folder, RefreshCw, 
  Lock, Unlock, Sparkles, BookOpen, Terminal, Copy, Cpu, BatteryCharging,
  Info, AlertCircle, BookCheck, Undo, BarChart4
} from 'lucide-react';
import { Wallpaper, HistoryItem, SchedulerConfig, SystemStats, AndroidFile } from './types';

// Curated high-quality starting wallpapers
const CURATED_WALLPAPERS: Wallpaper[] = [
  {
    id: 'curated_1',
    name: 'Geometric Aurora',
    url: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop',
    isFavorite: true,
    addedAt: Date.now() - 86400000 * 3,
    usageCount: 14,
    extractedColors: ['#0f766e', '#0d9488', '#38bdf8', '#0f172a'], // Teal / Blue theme
    size: '1.4 MB'
  },
  {
    id: 'curated_2',
    name: 'Synthwave Skyline',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    isFavorite: false,
    addedAt: Date.now() - 86400000 * 2,
    usageCount: 8,
    extractedColors: ['#7c1d1d', '#581c87', '#ec4899', '#1e1b4b'], // Pink / Indigo theme
    size: '1.8 MB'
  },
  {
    id: 'curated_3',
    name: 'Misty Alpine Pines',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop',
    isFavorite: true,
    addedAt: Date.now() - 86400000,
    usageCount: 22,
    extractedColors: ['#064e3b', '#047857', '#10b981', '#0b130e'], // Dark Green theme
    size: '2.1 MB'
  },
  {
    id: 'curated_4',
    name: 'Orion Nebula Space',
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop',
    isFavorite: false,
    addedAt: Date.now() - 43200000,
    usageCount: 5,
    extractedColors: ['#1e3a8a', '#2563eb', '#a855f7', '#030712'], // Purple / Blue theme
    size: '2.4 MB'
  },
  {
    id: 'curated_5',
    name: 'Terracotta Desert Slopes',
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=600&auto=format&fit=crop',
    isFavorite: false,
    addedAt: Date.now() - 10000000,
    usageCount: 11,
    extractedColors: ['#7c2d12', '#ea580c', '#f59e0b', '#1c1917'], // Terracotta / Sand theme
    size: '1.2 MB'
  }
];

// Production-ready Android Codebase representations
const ANDROID_FILES: AndroidFile[] = [
  {
    path: "app/build.gradle.kts",
    language: "kotlin",
    category: "Configuration",
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.kapt)
    alias(libs.plugins.hilt.android)
}

android {
    namespace = "com.example.wallshuffle"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.wallshuffle"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
        freeCompilerArgs += listOf("-opt-in=kotlinx.coroutines.ExperimentalCoroutinesApi")
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.14"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Jetpack Compose
    val composeBom = platform("androidx.compose:compose-bom:2024.05.00")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.activity:activity-compose:1.9.0")
    implementation("androidx.navigation:navigation-compose:2.7.7")

    // Room Database for local wallpaper data
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    kapt("androidx.room:room-compiler:$roomVersion")

    // Hilt Dependency Injection
    val hiltVersion = "2.51.1"
    implementation("com.google.dagger:hilt-android:$hiltVersion")
    kapt("com.google.dagger:hilt-compiler:$hiltVersion")
    implementation("androidx.hilt:hilt-navigation-compose:1.2.0")
    implementation("androidx.hilt:hilt-work:1.2.0")
    kapt("androidx.hilt:hilt-compiler:1.2.0")

    // WorkManager for background timing
    val workVersion = "2.9.0"
    implementation("androidx.work:work-runtime-ktx:$workVersion")

    // Coil for highly efficient image loading & caching
    implementation("io.coil-kt:coil-compose:2.6.0")

    // Core Android libraries
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.0")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.0")

    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}`
  },
  {
    path: "build.gradle.kts",
    language: "kotlin",
    category: "Configuration",
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.hilt.android) apply false
    alias(libs.plugins.devtools.ksp) apply false
}`
  },
  {
    path: "app/src/main/AndroidManifest.xml",
    language: "xml",
    category: "Configuration",
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Wallpaper permissions -->
    <uses-permission android:name="android.permission.SET_WALLPAPER" />
    <uses-permission android:name="android.permission.SET_WALLPAPER_HINTS" />
    
    <!-- Reboot triggers -->
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    
    <!-- Storage permissions (Android 13+ Media permissions & Legacy Support) -->
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" 
        android:maxSdkVersion="32" />

    <application
        android:name=".WallShuffleApplication"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.WallShuffle"
        tools:targetApi="34">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.WallShuffle">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Broadcast receiver that schedules WorkManager triggers dynamically after reboot -->
        <receiver
            android:name=".worker.BootReceiver"
            android:enabled="true"
            android:exported="false">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </receiver>

        <!-- Dynamic configuration provider for Hilt enabled WorkManager worker initialization -->
        <provider
            android:name="androidx.startup.InitializationProvider"
            android:authorities="\${applicationId}.androidx-startup"
            android:exported="false"
            tools:node="merge">
            <meta-data
                android:name="androidx.work.WorkManagerInitializer"
                android:value="androidx.startup.Initialization"
                tools:node="remove" />
        </provider>

    </application>
</manifest>`
  },
  {
    path: "data/WallpaperEntity.kt",
    language: "kotlin",
    category: "Data / Database",
    content: `package com.example.wallshuffle.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "wallpapers")
data class WallpaperEntity(
    @PrimaryKey val id: String,
    val name: String,
    val uriString: String,      // URI of gallery photo or caching stream path
    val addedAt: Long = System.currentTimeMillis(),
    val isFavorite: Boolean = false,
    val sizeString: String = "0.0 MB",
    val usageCount: Int = 0
)

@Entity(tableName = "app_config")
data class SchedulerConfigEntity(
    @PrimaryKey val id: Int = 0, // Single row configuration
    val isEnabled: Boolean = false,
    val intervalType: String = "1h", // "unlock", "15m", "30m", "1h", "6h", "12h", "24h", "custom"
    val customMinutes: Int = 45,
    val targetScreen: String = "Both",   // "Home", "Lock", "Both"
    val shuffleMode: String = "random"  // "random", "sequential"
)`
  },
  {
    path: "data/WallpaperDao.kt",
    language: "kotlin",
    category: "Data / Database",
    content: `package com.example.wallshuffle.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface WallpaperDao {
    @Query("SELECT * FROM wallpapers ORDER BY addedAt DESC")
    fun getAllWallpapersFlow(): Flow<List<WallpaperEntity>>

    @Query("SELECT * FROM wallpapers ORDER BY addedAt DESC")
    suspend fun getAllWallpapers(): List<WallpaperEntity>

    @Query("SELECT * FROM wallpapers WHERE isFavorite = 1")
    fun getFavoritesFlow(): Flow<List<WallpaperEntity>>

    @Query("SELECT * FROM wallpapers WHERE id = :id LIMIT 1")
    suspend fun getWallpaperById(id: String): WallpaperEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWallpaper(wallpaper: WallpaperEntity)

    @Update
    suspend fun updateWallpaper(wallpaper: WallpaperEntity)

    @Delete
    suspend fun deleteWallpaper(wallpaper: WallpaperEntity)

    @Query("UPDATE wallpapers SET usageCount = usageCount + 1 WHERE id = :id")
    suspend fun incrementUsageCount(id: String)

    // Configuration queries
    @Query("SELECT * FROM app_config WHERE id = 0 LIMIT 1")
    fun getConfigFlow(): Flow<SchedulerConfigEntity?>

    @Query("SELECT * FROM app_config WHERE id = 0 LIMIT 1")
    suspend fun getConfig(): SchedulerConfigEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveConfig(config: SchedulerConfigEntity)
}`
  },
  {
    path: "data/AppDatabase.kt",
    language: "kotlin",
    category: "Data / Database",
    content: `package com.example.wallshuffle.data

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [WallpaperEntity::class, SchedulerConfigEntity::class],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun wallpaperDao(): WallpaperDao
}`
  },
  {
    path: "worker/WallpaperWorker.kt",
    language: "kotlin",
    category: "Worker / Scheduling",
    content: `package com.example.wallshuffle.worker

import android.app.WallpaperManager
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.net.Uri
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.hilt.work.HiltWorker
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.example.wallshuffle.data.WallpaperDao
import com.example.wallshuffle.data.WallpaperEntity
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.InputStream
import java.io.ByteArrayOutputStream

@HiltWorker
class WallpaperWorker @AssistedInject constructor(
    @Assisted private val context: Context,
    @Assisted params: WorkerParameters,
    private val wallpaperDao: WallpaperDao
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        try {
            // 1. Fetch scheduler configuration & active wallpapers
            val config = wallpaperDao.getConfig() ?: return@withContext Result.success()
            if (!config.isEnabled) return@withContext Result.success()

            val wallpapers = wallpaperDao.getAllWallpapers()
            if (wallpapers.isEmpty()) {
                Log.w("WallpaperWorker", "Wallpaper collection is empty. Skipping scheduled change.")
                return@withContext Result.success()
            }

            // 2. Select next wallpaper based on shuffle settings
            val nextWallpaper = determineNextWallpaper(wallpapers, config.shuffleMode)
                ?: return@withContext Result.success()

            // 3. Set device wallpaper via WallpaperManager
            val success = setDeviceWallpaper(nextWallpaper.uriString, config.targetScreen)
            
            if (success) {
                // Increment statistics counter
                wallpaperDao.incrementUsageCount(nextWallpaper.id)
                Log.d("WallpaperWorker", "Successfully scheduled & updated wallpaper to: \${nextWallpaper.name}")
                Result.success()
            } else {
                Log.e("WallpaperWorker", "Skipped wallpaper. Set operation failed.")
                Result.failure()
            }
        } catch (e: Exception) {
            Log.e("WallpaperWorker", "Failed fully executing wallpaper Scheduler worker task", e)
            Result.retry()
        }
    }

    private fun determineNextWallpaper(
        list: List<WallpaperEntity>, 
        mode: String
    ): WallpaperEntity? {
        if (list.isEmpty()) return null
        if (mode == "random") {
            // Apply lightweight smart shuffle logic
            // Prefers lowest usage index or randomized selection
            val sortedByUsage = list.sortedBy { it.usageCount }
            val poolSize = (list.size * 0.5).coerceAtLeast(1.0).toInt()
            val smartPool = sortedByUsage.take(poolSize)
            return smartPool.random()
        }
        // Sequential Mode: fetch lowest usage count or sequentially select based on timeline
        return list.minByOrNull { it.usageCount }
    }

    private suspend fun setDeviceWallpaper(uriString: String, target: String): Boolean {
        return try {
            val contentResolver = context.contentResolver
            val uri = Uri.parse(uriString)

            // Dynamic memory optimization load using local streams
            val inputStream: InputStream? = contentResolver.openInputStream(uri)
            if (inputStream == null) {
                Log.e("WallpaperWorker", "URI stream inaccessible. Check contentResolver permissions.")
                return false
            }

            // High performance image compression and dimensions matching
            val options = BitmapFactory.Options().apply {
                inJustDecodeBounds = true
            }
            BitmapFactory.decodeStream(contentResolver.openInputStream(uri), null, options)
            
            // Adjust subsample size to keep bitmaps safe on RAM
            options.inSampleSize = calculateInSampleSize(options, 1200, 1920)
            options.inJustDecodeBounds = false
            
            val decodedBitmap = BitmapFactory.decodeStream(
                contentResolver.openInputStream(uri), 
                null, 
                options
            ) ?: return false

            val wallpaperManager = WallpaperManager.getInstance(context)
            
            withContext(Dispatchers.Main) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    val flags = when (target) {
                        "Home" -> WallpaperManager.FLAG_SYSTEM
                        "Lock" -> WallpaperManager.FLAG_LOCK
                        else -> WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK
                    }
                    if (flags and WallpaperManager.FLAG_SYSTEM != 0) {
                        wallpaperManager.setBitmap(decodedBitmap, null, true, WallpaperManager.FLAG_SYSTEM)
                    }
                    if (flags and WallpaperManager.FLAG_LOCK != 0) {
                        wallpaperManager.setBitmap(decodedBitmap, null, true, WallpaperManager.FLAG_LOCK)
                    }
                } else {
                    // Fallback for Older APIs
                    wallpaperManager.setBitmap(decodedBitmap)
                }
            }
            true
        } catch (e: Exception) {
            Log.e("WallpaperWorker", "Error executing bitmap update in service", e)
            false
        }
    }

    private fun calculateInSampleSize(
        options: BitmapFactory.Options, 
        reqWidth: Int, 
        reqHeight: Int
    ): Int {
        val (height: Int, width: Int) = options.outHeight to options.outWidth
        var inSampleSize = 1

        if (height > reqHeight || width > reqWidth) {
            val halfHeight = height / 2
            val halfWidth = width / 2
            while (halfHeight / inSampleSize >= reqHeight && halfWidth / inSampleSize >= reqWidth) {
                inSampleSize *= 2
            }
        }
        return inSampleSize
    }
}`
  },
  {
    path: "worker/WallpaperScheduler.kt",
    language: "kotlin",
    category: "Worker / Scheduling",
    content: `package com.example.wallshuffle.worker

import android.content.Context
import android.util.Log
import androidx.work.*
import java.util.concurrent.TimeUnit

object WallpaperScheduler {
    private const val PERIODIC_WORK_TAG = "WallShufflePeriodicWork"
    private const val UNLOCK_WORK_TAG = "WallShuffleUnlockWork"

    fun scheduleWallpaperChange(context: Context, intervalType: String, customMinutes: Int) {
        val workManager = WorkManager.getInstance(context)
        
        // Always safeguard by cancelling stale scheduling matches first
        cancelAllSchedules(context)

        if (intervalType == "unlock") {
            Log.d("WallpaperScheduler", "Scheduling Unlock mode. Hooked dynamically via app event tracking.")
            return
        }

        // Configure strict battery and connectivity parameters
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.NOT_REQUIRED)
            .setRequiresBatteryNotLow(true)
            .setRequiresStorageNotLow(true)
            .build()

        val intervalInMinutes = getIntervalMinutes(intervalType, customMinutes)

        // WorkManager minimum limit for periodic work is 15 minutes
        if (intervalInMinutes >= 15) {
            val periodicWorkRequest = PeriodicWorkRequestBuilder<WallpaperWorker>(
                intervalInMinutes.toLong(), TimeUnit.MINUTES
            )
            .setConstraints(constraints)
            .addTag(PERIODIC_WORK_TAG)
            .build()

            workManager.enqueueUniquePeriodicWork(
                PERIODIC_WORK_TAG,
                ExistingPeriodicWorkPolicy.UPDATE,
                periodicWorkRequest
            )
            Log.d("WallpaperScheduler", "Periodic work scheduled: Every \${intervalInMinutes} mins")
        } else {
            // Chaining Pattern helper: custom small interval support (<15m) using delayed OneTimeWorkRequests
            scheduleOneTimeChainedWorker(context, intervalInMinutes.toLong())
        }
    }

    fun triggerOneTimeImmediate(context: Context) {
        val workManager = WorkManager.getInstance(context)
        val oneTimeWork = OneTimeWorkRequestBuilder<WallpaperWorker>()
            .addTag("WallShuffleImmediateTrigger")
            .build()
        workManager.enqueue(oneTimeWork)
    }

    fun cancelAllSchedules(context: Context) {
        val workManager = WorkManager.getInstance(context)
        workManager.cancelAllWorkByTag(PERIODIC_WORK_TAG)
        workManager.cancelAllWorkByTag(UNLOCK_WORK_TAG)
        workManager.cancelUniqueWork(PERIODIC_WORK_TAG)
        Log.d("WallpaperScheduler", "Cancelled all active scheduled background work tasks.")
    }

    private fun getIntervalMinutes(type: String, custom: Int): Int {
        return when (type) {
            "15m" -> 15
            "30m" -> 30
            "1h" -> 60
            "6h" -> 360
            "12h" -> 720
            "24h" -> 1440
            "custom" -> custom.coerceAtLeast(5)
            else -> 60
        }
    }

    private fun scheduleOneTimeChainedWorker(context: Context, minutes: Long) {
        val workManager = WorkManager.getInstance(context)
        val oneTimeWork = OneTimeWorkRequestBuilder<WallpaperWorker>()
            .setInitialDelay(minutes, TimeUnit.MINUTES)
            .addTag(PERIODIC_WORK_TAG)
            .build()
        
        workManager.enqueueUniqueWork(
            "WallShuffleChainedWorker",
            ExistingWorkPolicy.REPLACE,
            oneTimeWork
        )
    }
}`
  },
  {
    path: "worker/BootReceiver.kt",
    language: "kotlin",
    category: "Worker / Scheduling",
    content: `package com.example.wallshuffle.worker

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.example.wallshuffle.data.WallpaperDao
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@AndroidEntryPoint
class BootReceiver : BroadcastReceiver() {

    @Inject
    lateinit var wallpaperDao: WallpaperDao

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            Log.d("BootReceiver", "Reboot fully verified. Syncing WallShuffle scheduler...")
            
            // Resume schedule from configuration asynchronously in a coroutine scope
            val pendingResult = goAsync()
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val config = wallpaperDao.getConfig()
                    if (config != null && config.isEnabled) {
                        WallpaperScheduler.scheduleWallpaperChange(
                            context.applicationContext,
                            config.intervalType,
                            config.customMinutes
                        )
                        Log.d("BootReceiver", "Scheduler resumed safely: \${config.intervalType}")
                    }
                } catch (e: Exception) {
                    Log.error("BootReceiver", "Failed starting WallShuffle receiver logic", e)
                } finally {
                    pendingResult.finish()
                }
            }
        }
    }
}`
  },
  {
    path: "di/AppModule.kt",
    language: "kotlin",
    category: "ViewModel & DI",
    content: `package com.example.wallshuffle.di

import android.content.Context
import androidx.room.Room
import com.example.wallshuffle.data.AppDatabase
import com.example.wallshuffle.data.WallpaperDao
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideAppDatabase(@ApplicationContext context: Context): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "wallshuffle_db"
        )
        .fallbackToDestructiveMigration()
        .build()
    }

    @Provides
    fun provideWallpaperDao(appDatabase: AppDatabase): WallpaperDao {
        return appDatabase.wallpaperDao()
    }
}`
  },
  {
    path: "viewmodel/MainViewModel.kt",
    language: "kotlin",
    category: "ViewModel & DI",
    content: `package com.example.wallshuffle.viewmodel

import android.app.Application
import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.wallshuffle.data.SchedulerConfigEntity
import com.example.wallshuffle.data.WallpaperDao
import com.example.wallshuffle.data.WallpaperEntity
import com.example.wallshuffle.worker.WallpaperScheduler
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import java.io.InputStream
import java.util.UUID
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    application: Application,
    private val wallpaperDao: WallpaperDao
) : AndroidViewModel(application) {

    val wallpaperList: StateFlow<List<WallpaperEntity>> = wallpaperDao.getAllWallpapersFlow()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val configState: StateFlow<SchedulerConfigEntity> = wallpaperDao.getConfigFlow()
        .map { it ?: SchedulerConfigEntity() }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), SchedulerConfigEntity())

    val favoriteList: StateFlow<List<WallpaperEntity>> = wallpaperDao.getFavoritesFlow()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    init {
        // Hydrate default database configuration on initialization if missing
        viewModelScope.launch {
            if (wallpaperDao.getConfig() == null) {
                wallpaperDao.saveConfig(SchedulerConfigEntity())
            }
        }
    }

    fun addWallpaperFromGallery(uri: Uri, displayName: String, sizeStr: String) {
        viewModelScope.launch {
            try {
                // Persistent content URI read permissions mapping
                val contentResolver = getApplication<Application>().contentResolver
                val takeFlags: Int = Intent.FLAG_GRANT_READ_URI_PERMISSION
                contentResolver.takePersistableUriPermission(uri, takeFlags)

                val entity = WallpaperEntity(
                    id = UUID.randomUUID().toString(),
                    name = displayName,
                    uriString = uri.toString(),
                    isFavorite = false,
                    sizeString = sizeStr
                )
                wallpaperDao.insertWallpaper(entity)
                Log.d("MainViewModel", "Registered and persists content URI for key: \${entity.id}")
            } catch (e: Exception) {
                Log.e("MainViewModel", "Insecure URI storage or intent error", e)
            }
        }
    }

    fun deleteWallpaper(wallpaper: WallpaperEntity) {
        viewModelScope.launch {
            wallpaperDao.deleteWallpaper(wallpaper)
        }
    }

    fun toggleFavorite(wallpaper: WallpaperEntity) {
        viewModelScope.launch {
            val updated = wallpaper.copy(isFavorite = !wallpaper.isFavorite)
            wallpaperDao.updateWallpaper(updated)
        }
    }

    fun triggerImmediateShuffle() {
        WallpaperScheduler.triggerOneTimeImmediate(getApplication())
    }

    fun updateSchedulerConfig(
        isEnabled: Boolean,
        intervalType: String,
        customMinutes: Int,
        targetScreen: String,
        shuffleMode: String
    ) {
        viewModelScope.launch {
            val newConfig = SchedulerConfigEntity(
                id = 0,
                isEnabled = isEnabled,
                intervalType = intervalType,
                customMinutes = customMinutes,
                targetScreen = targetScreen,
                shuffleMode = shuffleMode
            )
            wallpaperDao.saveConfig(newConfig)

            if (isEnabled) {
                WallpaperScheduler.scheduleWallpaperChange(
                    getApplication(),
                    intervalType,
                    customMinutes
                )
            } else {
                WallpaperScheduler.cancelAllSchedules(getApplication())
            }
        }
    }
}`
  },
  {
    path: "ui/MainActivity.kt",
    language: "kotlin",
    category: "UI Screens",
    content: `package com.example.wallshuffle

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.wallshuffle.ui.MainContainer
import com.example.wallshuffle.ui.theme.WallShuffleTheme
import com.example.wallshuffle.viewmodel.MainViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            WallShuffleTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MainContainer(viewModel = viewModel)
                }
            }
        }
    }
}`
  },
  {
    path: "ui/MainContainer.kt",
    language: "kotlin",
    category: "UI Screens",
    content: `package com.example.wallshuffle.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.wallshuffle.viewmodel.MainViewModel

sealed class Screen(val route: String, val title: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    object Dashboard : Screen("dashboard", "Home", Icons.Default.Dashboard)
    object Library : Screen("library", "Library", Icons.Default.PhotoLibrary)
    object Settings : Screen("settings", "Scheduler", Icons.Default.Timer)
    object Favorites : Screen("favorites", "Starred", Icons.Default.Star)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainContainer(viewModel: MainViewModel) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("WallShuffle", style = MaterialTheme.typography.titleMedium) },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            )
        },
        bottomBar = {
            NavigationBar {
                val screens = listOf(Screen.Dashboard, Screen.Library, Screen.Settings, Screen.Favorites)
                screens.forEach { screen ->
                    NavigationBarItem(
                        icon = { Icon(screen.icon, contentDescription = screen.title) },
                        label = { Text(screen.title) },
                        selected = currentRoute == screen.route,
                        onClick = {
                            if (currentRoute != screen.route) {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        }
                    )
                }
            }
        }
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = Screen.Dashboard.route,
            modifier = Modifier.padding(paddingValues)
        ) {
            composable(Screen.Dashboard.route) {
                DashboardScreen(viewModel = viewModel)
            }
            composable(Screen.Library.route) {
                LibraryScreen(viewModel = viewModel)
            }
            composable(Screen.Settings.route) {
                SettingsScreen(viewModel = viewModel)
            }
            composable(Screen.Favorites.route) {
                FavoritesScreen(viewModel = viewModel)
            }
        }
    }
}`
  },
  {
    path: "ui/Theme.kt",
    language: "kotlin",
    category: "UI Screens",
    content: `package com.example.wallshuffle.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF80cbc4),
    secondary = Color(0xFF26a69a),
    tertiary = Color(0xFF00796b),
    background = Color(0xFF121212),
    surface = Color(0xFF1e1e1e)
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF00695c),
    secondary = Color(0xFF00897b),
    tertiary = Color(0xFF80cbc4),
    background = Color(0xFFFFFFFF),
    surface = Color(0xFFF5F5F5)
)

@Composable
fun WallShuffleTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true, // Dynamic color extraction enabled for Android 12+
    content: @Composable () -> Unit
) {
    val context = LocalContext.current
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(),
        content = content
    )
}`
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'instructions'>('simulator');
  const [phoneScreen, setPhoneScreen] = useState<'onboarding' | 'dashboard' | 'library' | 'settings' | 'history' | 'favorites'>('onboarding');
  
  // Wallpaper queues and configurations inside Simulator
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(() => {
    const saved = localStorage.getItem('ws_wallpapers');
    return saved ? JSON.parse(saved) : CURATED_WALLPAPERS;
  });
  
  const [config, setConfig] = useState<SchedulerConfig>(() => {
    const saved = localStorage.getItem('ws_config');
    return saved ? JSON.parse(saved) : {
      isEnabled: true,
      intervalType: '1h',
      customIntervalMinutes: 45,
      target: 'Both',
      shuffleMode: 'random',
      avoidRecentCount: 2
    };
  });

  const [stats, setStats] = useState<SystemStats>({
    totalChanges: 48,
    mostUsedName: 'Misty Alpine Pines',
    mostUsedUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop',
    dailyChanges: 12,
    batteryOptimized: true
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    return [
      {
        id: 'hist_1',
        wallpaperId: 'curated_3',
        wallpaperName: 'Misty Alpine Pines',
        wallpaperUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop',
        changedAt: Date.now() - 3600000,
        target: 'Both'
      },
      {
        id: 'hist_2',
        wallpaperId: 'curated_1',
        wallpaperName: 'Geometric Aurora',
        wallpaperUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop',
        changedAt: Date.now() - 7200000,
        target: 'Home'
      },
      {
        id: 'hist_3',
        wallpaperId: 'curated_5',
        wallpaperName: 'Terracotta Desert Slopes',
        wallpaperUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=600&auto=format&fit=crop',
        changedAt: Date.now() - 10800000,
        target: 'Lock'
      }
    ];
  });

  // Simulator State: Unlocked status and mock dates
  const [deviceLocked, setDeviceLocked] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<Wallpaper>(CURATED_WALLPAPERS[2]);
  const [simulatedTime, setSimulatedTime] = useState<string>("18:06");
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isChangingWallpaper, setIsChangingWallpaper] = useState(false);
  const [customMinutesInput, setCustomMinutesInput] = useState<number>(45);

  // New wallpaper states
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customNameInput, setCustomNameInput] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [activeWallpaperPreview, setActiveWallpaperPreview] = useState<Wallpaper | null>(null);

  // Code Explorer States
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(ANDROID_FILES[0]);
  const [copiedFileIndex, setCopiedFileIndex] = useState<boolean>(false);
  const [codeCategoryFilter, setCodeCategoryFilter] = useState<string>('All');

  // Multi-theme Accent Colors Extracted Dynamically!
  const [accentColor, setAccentColor] = useState('#0d9488'); // Default Teal
  const [accentBg, setAccentBg] = useState('rgba(13, 148, 136, 0.15)');

  // Persistence helpers
  useEffect(() => {
    localStorage.setItem('ws_wallpapers', JSON.stringify(wallpapers));
  }, [wallpapers]);

  useEffect(() => {
    localStorage.setItem('ws_config', JSON.stringify(config));
  }, [config]);

  // Handle dynamic system color UI update when current wallpaper changes
  useEffect(() => {
    if (currentWallpaper && currentWallpaper.extractedColors) {
      const primary = currentWallpaper.extractedColors[1] || currentWallpaper.extractedColors[0];
      setAccentColor(primary);
      setAccentBg(`${primary}26`); // 15% opacity
    }
  }, [currentWallpaper]);

  // Clock updates inside Simulator
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      let h = d.getHours().toString().padStart(2, '0');
      let m = d.getMinutes().toString().padStart(2, '0');
      setSimulatedTime(`${h}:${m}`);
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  // Wallpaper change action
  const triggerWallpaperChange = (byUnlock: boolean = false) => {
    if (wallpapers.length === 0) return;
    setIsChangingWallpaper(true);

    setTimeout(() => {
      let nextWp: Wallpaper;
      if (config.shuffleMode === 'random') {
        // Smart Shuffle avoiding lowest used or matching index
        const candidates = wallpapers.length > 2 
          ? wallpapers.filter(w => w.id !== currentWallpaper.id)
          : wallpapers;
        
        // Pick best randomized layout
        nextWp = candidates[Math.floor(Math.random() * candidates.length)];
      } else {
        // Sequential index lookup
        const curIdx = wallpapers.findIndex(w => w.id === currentWallpaper.id);
        const nextIdx = (curIdx + 1) % wallpapers.length;
        nextWp = wallpapers[nextIdx];
      }

      setCurrentWallpaper(nextWp);
      setIsChangingWallpaper(false);

      // Add to History
      const hItem: HistoryItem = {
        id: `hist_${Date.now()}`,
        wallpaperId: nextWp.id,
        wallpaperName: nextWp.name,
        wallpaperUrl: nextWp.url,
        changedAt: Date.now(),
        target: config.target
      };
      setHistory(prev => [hItem, ...prev.slice(0, 19)]);
      
      // Update statistics
      setStats(prev => {
        const nextTotal = prev.totalChanges + 1;
        
        // recalculate most used in local list
        const updatedQueue = [...wallpapers];
        const wpToIncr = updatedQueue.find(w => w.id === nextWp.id);
        if (wpToIncr) {
          wpToIncr.usageCount += 1;
        }
        
        const sorted = [...updatedQueue].sort((a,b) => b.usageCount - a.usageCount);
        
        return {
          ...prev,
          totalChanges: nextTotal,
          mostUsedName: sorted[0]?.name || nextWp.name,
          mostUsedUrl: sorted[0]?.url || nextWp.url,
          dailyChanges: prev.dailyChanges + 1
        };
      });

    }, 800);
  };

  // Simulating the device lock/unlock triggers
  const handleDeviceSleepToggle = () => {
    if (deviceLocked) {
      setDeviceLocked(false);
      // Trigger dynamic unlock scheduler change if option selected
      if (config.isEnabled && config.intervalType === 'unlock') {
        triggerWallpaperChange(true);
      }
    } else {
      setDeviceLocked(true);
    }
  };

  const handleUploadClick = () => {
    if (!customUrlInput || !customNameInput) return;
    const newWp: Wallpaper = {
      id: `custom_${Date.now()}`,
      name: customNameInput,
      url: customUrlInput,
      isFavorite: false,
      addedAt: Date.now(),
      usageCount: 0,
      extractedColors: ['#3b82f6', '#1d4ed8', '#93c5fd', '#0f172a'],
      size: '1.5 MB'
    };

    setWallpapers(prev => [newWp, ...prev]);
    setCustomUrlInput('');
    setCustomNameInput('');
  };

  const handleAiWallpaperGen = () => {
    if (!aiPrompt) return;
    const colors = [
      ['#db2777', '#be185d', '#fbcfe8', '#030712'], // Magenta
      ['#f59e0b', '#d97706', '#fef3c7', '#1c1917'], // Golden
      ['#8b5cf6', '#6d28d9', '#ddd6fe', '#020617'], // Ultraviolet
      ['#10b981', '#047857', '#d1fae5', '#064e3b'], // Emerald
    ];

    const randomColorSet = colors[Math.floor(Math.random() * colors.length)];
    // Procedural generation URI mock patterns (using stunning abstract canvas gradients generator)
    const encodedPrompt = encodeURIComponent(aiPrompt);
    const mockAiUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop&text=${encodedPrompt}`;

    const newWp: Wallpaper = {
      id: `ai_${Date.now()}`,
      name: `AI: ${aiPrompt.slice(0, 18)}...`,
      url: mockAiUrl,
      isFavorite: false,
      addedAt: Date.now(),
      usageCount: 0,
      extractedColors: randomColorSet,
      size: '2.0 MB'
    };

    setWallpapers(prev => [newWp, ...prev]);
    setAiPrompt('');
  };

  const toggleFavoriteWp = (id: string) => {
    setWallpapers(prev => prev.map(wp => {
      if (wp.id === id) {
        return { ...wp, isFavorite: !wp.isFavorite };
      }
      return wp;
    }));
  };

  const deleteWp = (id: string) => {
    setWallpapers(prev => prev.filter(wp => wp.id !== id));
    if (currentWallpaper.id === id && wallpapers.length > 1) {
      setCurrentWallpaper(wallpapers.find(w => w.id !== id) || CURATED_WALLPAPERS[0]);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopiedFileIndex(true);
    setTimeout(() => setCopiedFileIndex(false), 2000);
  };

  // Filter Android source files categories
  const filteredFiles = ANDROID_FILES.filter(f => 
    codeCategoryFilter === 'All' || f.category === codeCategoryFilter
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Dynamic CSS injecting local CSS vars matching wallpaper color extraction */}
      <style>{`
        :root {
          --wp-accent: ${accentColor};
          --wp-accent-bg: ${accentBg};
        }
      `}</style>

      {/* Modern High-End Top Bar Panel */}
      <header className="border-b border-slate-900 bg-slate-950 p-4 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-teal-600 to-emerald-500 rounded-xl shadow-lg ring-1 ring-white/10 animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">WallShuffle Studio</h1>
                <span className="text-xs bg-teal-500/15 text-teal-400 px-2 py-0.5 rounded-full font-mono border border-teal-500/25">v1.1 Active</span>
              </div>
              <p className="text-xs text-slate-400">Jetpack Compose wallpaper scheduler & interactive sandbox simulation</p>
            </div>
          </div>

          {/* Navigation Panel Mode */}
          <nav className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'simulator' 
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Android Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'code' 
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Native Kotlin Code</span>
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'instructions' 
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookCheck className="w-4 h-4" />
              <span>Studio Guide</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Android Device Frame (Takes 5 columns) */}
        <section className={`lg:col-span-5 flex flex-col items-center select-none ${activeTab === 'simulator' ? 'block' : 'hidden lg:flex'}`}>
          <div className="w-full max-w-[360px] relative">
            
            {/* Action Simulator Badges (Outside Device) */}
            <div className="absolute -left-12 top-24 hidden xl:flex flex-col gap-3">
              <button 
                onClick={handleDeviceSleepToggle}
                className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition"
                title="Mock Sleep/Power Button (Unlocking triggers 'unlock' scheduler events)"
              >
                {deviceLocked ? <Unlock className="w-5 h-5 text-teal-400" /> : <Lock className="w-5 h-5 text-slate-400" />}
              </button>
              <button 
                onClick={() => triggerWallpaperChange(false)}
                className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition"
                title="Force Interval Wallpaper Change Event"
              >
                <RefreshCw className={`w-5 h-5 text-teal-400 ${isChangingWallpaper ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Smart Phone Case Wrapper */}
            <div className="w-full aspect-[9/19] bg-slate-900 rounded-[44px] overflow-hidden p-2.5 shadow-2xl border-4 border-slate-800 ring-2 ring-slate-750 relative">
              
              {/* Speaker / Notch Line */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-50 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full mb-1"></div>
                <div className="w-2 h-2 bg-slate-900 rounded-full ml-2 mb-1 border border-slate-800"></div>
              </div>

              {/* SCREEN CANVAS WORKSPACE */}
              <div 
                className="w-full h-full rounded-[35px] overflow-hidden relative flex flex-col bg-slate-950 font-sans transition-all duration-700"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.95)), url(${currentWallpaper.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* 1. DEVICE LOCKED SCREEN OVERLAY */}
                {deviceLocked ? (
                  <div className="absolute inset-0 z-40 bg-black/75 backdrop-blur-md flex flex-col items-center justify-between p-6">
                    {/* Status Icons */}
                    <div className="w-full flex justify-between items-center text-xs text-slate-400 pt-2 font-mono">
                      <span>WallShuffle lock</span>
                      <div className="flex items-center gap-1">
                        <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                        <span>98%</span>
                      </div>
                    </div>

                    {/* Clock Display */}
                    <div className="flex flex-col items-center my-auto">
                      <Lock className="w-10 h-10 text-teal-400 mb-4 animate-bounce" />
                      <h3 className="text-5xl font-extralight text-white font-mono">{simulatedTime}</h3>
                      <p className="text-sm text-slate-300 mt-2">Friday, May 29, 2026</p>
                      
                      <div className="mt-8 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl text-center text-xs backdrop-blur max-w-xs text-slate-300">
                        <p className="font-semibold text-white">Unlock Trigger Mode</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Every unlock event will immediately shuffle background</p>
                      </div>
                    </div>

                    {/* Navigation bar to unlock */}
                    <button 
                      onClick={handleDeviceSleepToggle}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl py-3 font-semibold text-sm hover:scale-95 transition flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Unlock className="w-4 h-4" />
                      Swipe / Unlock Screen
                    </button>
                  </div>
                ) : null}

                {/* Simulated Smartphone Status Bar inside unlocked mode */}
                <div className="h-10 pt-4 px-5 flex justify-between items-center text-white/90 text-xs font-semibold z-20 backdrop-blur-sm bg-black/10">
                  <span className="font-mono">{simulatedTime}</span>
                  <div className="flex items-center gap-1.5 font-sans">
                    <span className="text-[9px] bg-black/35 px-1.5 py-0.5 rounded font-mono border border-white/10 text-emerald-400">● Live Preview</span>
                    <Cpu className="w-3.5 h-3.5" />
                    <span>WiFi</span>
                  </div>
                </div>

                {/* 2. ONBOARDING OVERLAY */}
                {phoneScreen === 'onboarding' ? (
                  <div className="flex-1 flex flex-col justify-between p-5 z-20 bg-slate-950/95 overflow-y-auto">
                    <div className="flex-1 flex flex-col justify-center text-center py-6">
                      <div className="mx-auto p-4 bg-teal-500/10 rounded-2xl border border-teal-500/25 mb-4 text-teal-400">
                        <Sparkles className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
                      </div>
                      
                      {onboardingStep === 1 ? (
                        <>
                          <h4 className="text-xl font-bold text-white leading-tight">Welcome to WallShuffle</h4>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                            A clean, battery-optimized Android automation utility tool. Let's configure system permissions.
                          </p>
                          <div className="mt-4 text-left bg-slate-900 border border-slate-800 p-3 rounded-xl gap-2 font-mono text-[10px] text-slate-300">
                            <span className="text-teal-400 font-semibold block mb-1">✓ Storage Permissions (READ_MEDIA_IMAGES)</span>
                            Access your external gallery images to create customized rotation loops.
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="text-xl font-bold text-white leading-tight">Automation Engine</h4>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                            How we scheduler safely inside Android system background without battery depletion risks.
                          </p>
                          <div className="mt-4 text-left bg-slate-900 border border-slate-800 p-3 rounded-xl gap-2 font-mono text-[10px] text-slate-300">
                            <span className="text-teal-400 font-semibold block mb-1">✓ Background Service (WorkManager)</span>
                            Maintains schedules even after device restarts utilizing minimum battery assets.
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {onboardingStep === 1 ? (
                        <button 
                          onClick={() => setOnboardingStep(2)}
                          className="flex-1 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl py-2.5 font-semibold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1"
                        >
                          Next Target
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setPhoneScreen('dashboard')}
                          className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl py-2.5 font-semibold text-xs hover:scale-95 transition"
                        >
                          Agree & Activate
                        </button>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* 3. SIMULATOR INNER SCREEN FLOW CONTAINER */}
                {phoneScreen !== 'onboarding' ? (
                  <div className="flex-1 flex flex-col justify-between overflow-y-auto z-10 p-4">
                    
                    {/* TOP ACCENT CARD */}
                    <div className="bg-slate-950/80 border border-slate-800/40 rounded-2xl p-3.5 backdrop-blur shadow-lg mb-2">
                      
                      {/* Dashboard Main Module View */}
                      {phoneScreen === 'dashboard' && (
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 font-mono">Active Engine</span>
                            <span className={`h-2.5 w-2.5 rounded-full ${config.isEnabled ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`}></span>
                          </div>

                          {/* Wallpaper Preview Shell */}
                          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-md">
                            <img 
                              src={currentWallpaper.url} 
                              alt={currentWallpaper.name} 
                              className="w-full h-full object-cover"
                            />
                            {isChangingWallpaper && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs text-teal-400 font-mono">
                                <Loader2 className="w-5 h-5 animate-spin mr-1.5" />
                                Setting screen...
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300 border-t border-slate-900 pt-2.5">
                            <div>
                              <span className="text-slate-500 block"> wallpaper</span>
                              <span className="text-white hover:underline truncate block max-w-[120px]">{currentWallpaper.name}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">next rotation</span>
                              <span className="text-teal-400 block font-semibold">
                                {config.isEnabled 
                                  ? (config.intervalType === 'unlock' ? 'Every Unlock event' : `In ~${config.intervalType}`)
                                  : 'Paused'}
                              </span>
                            </div>
                          </div>

                          {/* Trigger simulation controls */}
                          <div className="flex gap-1 pt-1">
                            <button
                              onClick={() => triggerWallpaperChange(false)}
                              disabled={isChangingWallpaper}
                              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-teal-500 text-slate-950 font-bold rounded-lg text-[10px] hover:bg-teal-400 transition"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              Simulate Step
                            </button>
                            <button
                              onClick={handleDeviceSleepToggle}
                              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-lg text-[10px] hover:bg-slate-800 transition"
                            >
                              <Lock className="w-3 h-3" />
                              Sleep device
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Library Storage Frame */}
                      {phoneScreen === 'library' && (
                        <div className="space-y-4">
                          <h5 className="text-xs font-bold text-white flex items-center justify-between border-b border-slate-900 pb-2">
                            <span>Image Database Collection</span>
                            <span className="font-mono text-[9px] bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded border border-teal-500/25">
                              {wallpapers.length} Item(s)
                            </span>
                          </h5>

                          {/* Quick upload segment */}
                          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-2">
                            <span className="text-[9px] text-slate-400 font-mono block">Custom Web URI Input</span>
                            <input 
                              type="text" 
                              placeholder="Image URL (Unsplash or Pexels)"
                              value={customUrlInput}
                              onChange={(e) => setCustomUrlInput(e.target.value)}
                              className="w-full text-[10px] p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:border-teal-500 outline-none"
                            />
                            <input 
                              type="text" 
                              placeholder="Wallpaper Display Name"
                              value={customNameInput}
                              onChange={(e) => setCustomNameInput(e.target.value)}
                              className="w-full text-[10px] p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:border-teal-500 outline-none"
                            />
                            <button 
                              onClick={handleUploadClick}
                              className="w-full bg-teal-500 text-slate-950 rounded py-1 font-bold text-[10px] hover:bg-teal-400 transition flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              Load to Local DB
                            </button>
                          </div>

                          {/* Prompt AI Generator */}
                          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-2">
                            <span className="text-[9px] text-slate-400 font-mono block flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                              AI Generated Themes
                            </span>
                            <input 
                              type="text" 
                              placeholder="Describe abstract theme details..."
                              value={aiPrompt}
                              onChange={(e) => setAiPrompt(e.target.value)}
                              className="w-full text-[10px] p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:border-teal-400 outline-none"
                            />
                            <button 
                              onClick={handleAiWallpaperGen}
                              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded py-1 font-bold text-[10px] hover:opacity-90 transition flex items-center justify-center gap-1"
                            >
                              <Sparkles className="w-3 h-3" />
                              Generate & Cache
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Settings Component Screen */}
                      {phoneScreen === 'settings' && (
                        <div className="space-y-3.5">
                          <h5 className="text-xs font-bold text-white border-b border-slide-900 pb-1 flex items-center justify-between">
                            <span>Background Scheduler Config</span>
                            <span className="text-[9px] text-teal-400 font-mono">Alarm API</span>
                          </h5>

                          <div className="space-y-2 text-[11px]">
                            {/* Toggle switcher */}
                            <div className="flex items-center justify-between p-1">
                              <span className="text-slate-300 font-medium">Auto Switch Enabled</span>
                              <input 
                                type="checkbox" 
                                checked={config.isEnabled}
                                onChange={(e) => setConfig({ ...config, isEnabled: e.target.checked })}
                                className="w-4 h-4 accent-teal-500 rounded bg-slate-800 cursor-pointer"
                              />
                            </div>

                            {/* Options Targets */}
                            <div className="flex flex-col gap-1.5 pt-1.5">
                              <span className="text-[10px] text-slate-400 font-mono">Target Screens</span>
                              <div className="grid grid-cols-3 gap-1">
                                {['Home', 'Lock', 'Both'].map(t => (
                                  <button
                                    key={t}
                                    onClick={() => setConfig({ ...config, target: t as any })}
                                    className={`py-1 text-[9px] font-mono rounded ${
                                      config.target === t 
                                        ? 'bg-teal-500 text-slate-950 font-bold' 
                                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                                    }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Interval selectors */}
                            <div className="flex flex-col gap-1.5 pt-1.5">
                              <span className="text-[10px] text-slate-400 font-mono">Rotation Recurrence Interval</span>
                              <select
                                value={config.intervalType}
                                onChange={(e) => setConfig({ ...config, intervalType: e.target.value as any })}
                                className="bg-slate-900 border border-slate-800 rounded p-1 text-slate-200 outline-none focus:border-teal-500 font-mono"
                              >
                                <option value="unlock">Every Screen Unlock event</option>
                                <option value="15m">Periodic (Every 15 Minutes)</option>
                                <option value="30m">Periodic (Every 30 Minutes)</option>
                                <option value="1h">Periodic (Every 60 Minutes)</option>
                                <option value="6h">Periodic (Every 6 Hours)</option>
                                <option value="12h">Periodic (Every 12 Hours)</option>
                                <option value="24h">Periodic (Every 24 Hours)</option>
                                <option value="custom">Custom Specified (In Mins)</option>
                              </select>
                            </div>

                            {config.intervalType === 'custom' && (
                              <div className="flex items-center gap-2 pt-1 font-mono">
                                <span className="text-[10px] text-slate-400">Specify (Mins):</span>
                                <input 
                                  type="number"
                                  value={customMinutesInput}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value) || 5;
                                    setCustomMinutesInput(val);
                                    setConfig({ ...config, customIntervalMinutes: val });
                                  }}
                                  className="w-16 bg-slate-900 border border-slate-800 rounded p-0.5 text-center text-teal-400 text-[10px]"
                                />
                              </div>
                            )}

                            {/* Shuffle vs Sequential */}
                            <div className="flex flex-col gap-1.5 pt-1.5">
                              <span className="text-[10px] text-slate-400 font-mono">Routing Strategy Mode</span>
                              <div className="grid grid-cols-2 gap-1.5">
                                {['random', 'sequential'].map(m => (
                                  <button
                                    key={m}
                                    onClick={() => setConfig({ ...config, shuffleMode: m as any })}
                                    className={`py-1 text-[9px] font-mono rounded capitalize ${
                                      config.shuffleMode === m 
                                        ? 'bg-teal-500 text-slate-950 font-bold' 
                                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                                    }`}
                                  >
                                    {m === 'random' ? 'Smart Shuffle' : 'Sequential flow'}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* History Log Display screen */}
                      {phoneScreen === 'history' && (
                        <div className="space-y-3">
                          <h5 className="text-xs font-bold text-white border-b border-slate-900 pb-1.5 flex items-center justify-between">
                            <span>Background Trigger Timeline</span>
                          </h5>

                          <div className="max-h-[190px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {history.length === 0 ? (
                              <p className="text-[10px] text-slate-400 text-center py-4">No recent history events recorded yet</p>
                            ) : (
                              history.map(item => (
                                <div key={item.id} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800/40">
                                  <img 
                                    src={item.url} 
                                    alt={item.name} 
                                    className="w-7 h-7 object-cover rounded-md flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h6 className="text-[9px] font-bold text-white truncate">{item.wallpaperName}</h6>
                                    <span className="text-[8px] text-slate-400 font-mono uppercase block -mt-1">{item.target} target</span>
                                  </div>
                                  <span className="text-[8px] text-teal-400 font-mono">
                                    {new Date(item.changedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* STARRED FAVORITES PREVIEW */}
                      {phoneScreen === 'favorites' && (
                        <div className="space-y-3">
                          <h5 className="text-xs font-bold text-white border-b border-slate-900 pb-1.5 flex items-center justify-between">
                            <span>Favorite Wallpaper Cache</span>
                          </h5>

                          <div className="max-h-[190px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {wallpapers.filter(w => w.isFavorite).length === 0 ? (
                              <div className="text-center py-6">
                                <Star className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                <p className="text-[10px] text-slate-400 leading-relaxed">No star-marked favorites configured yet. Stars enable priority rotation selections.</p>
                              </div>
                            ) : (
                              wallpapers.filter(w => w.isFavorite).map(item => (
                                <div key={item.id} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900 border border-slate-800/40">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <img 
                                      src={item.url} 
                                      alt={item.name} 
                                      className="w-7 h-7 object-cover rounded-md flex-shrink-0 animate-scale-in"
                                    />
                                    <div className="min-w-0">
                                      <h6 className="text-[9px] font-bold text-white truncate">{item.name}</h6>
                                      <span className="text-[8px] text-slate-400 block -mt-1 font-mono">Usage Index: {item.usageCount}</span>
                                    </div>
                                  </div>
                                  <div className="flex gap-1.5">
                                    <button 
                                      onClick={() => setCurrentWallpaper(item)}
                                      className="text-[8px] bg-teal-500 text-slate-950 font-bold px-1.5 py-0.5 rounded hover:bg-teal-400"
                                    >
                                      Apply
                                    </button>
                                    <button 
                                      onClick={() => toggleFavoriteWp(item.id)}
                                      className="text-amber-400"
                                    >
                                      <Star className="w-3.5 h-3.5 fill-current" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* WALLPAPER IN-Simulator GALLERY SELECTION GRID - Only when screen is Library */}
                    {phoneScreen === 'library' && (
                      <div className="flex-1 overflow-y-auto max-h-[140px] pr-1 mb-2 custom-scrollbar">
                        <div className="grid grid-cols-2 gap-2">
                          {wallpapers.map(wp => (
                            <div 
                              key={wp.id} 
                              className={`relative group rounded-xl overflow-hidden aspect-[4/3] border cursor-pointer hover:scale-95 transition-all duration-300 ${
                                currentWallpaper.id === wp.id 
                                  ? 'border-teal-400 ring-2 ring-teal-500/20' 
                                  : 'border-slate-800'
                              }`}
                              onClick={() => setCurrentWallpaper(wp)}
                            >
                              <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-1.5">
                                <p className="text-[8px] text-white font-bold truncate">{wp.name}</p>
                                <p className="text-[7px] text-slate-300 font-mono">Usage Score: {wp.usageCount}</p>
                              </div>
                              
                              {/* Favorites marker action overlay inside simulator */}
                              <div className="absolute top-1 right-1 flex gap-1 z-20">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavoriteWp(wp.id);
                                  }}
                                  className={`p-1 rounded-full text-xs transition duration-200 ${wp.isFavorite ? 'text-amber-400 bg-black/45' : 'text-slate-300 bg-black/45 hover:text-amber-300'}`}
                                >
                                  <Star className={`w-3.5 h-3.5 ${wp.isFavorite ? 'fill-current' : ''}`} />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteWp(wp.id);
                                  }}
                                  className="p-1 rounded-full bg-black/45 text-rose-400 hover:text-rose-300 transition duration-200"
                                >
                                  <Trash2 className="w-3.2 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* INTERACTIVE NAVIGATION TAB PANEL INSIDE MOBILE DESIGN MOCKUP */}
                    <div className="bg-slate-950/90 border border-slate-900 rounded-2xl p-1.5 flex justify-between items-center z-15 shadow-xl backdrop-blur">
                      <button 
                        onClick={() => setPhoneScreen('dashboard')}
                        className={`flex flex-col items-center flex-1 py-1 rounded-xl transition ${phoneScreen === 'dashboard' ? 'text-teal-400' : 'text-slate-500 hover:text-white'}`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span className="text-[8px] mt-0.5">Home</span>
                      </button>
                      <button 
                        onClick={() => setPhoneScreen('library')}
                        className={`flex flex-col items-center flex-1 py-1 rounded-xl transition ${phoneScreen === 'library' ? 'text-teal-400' : 'text-slate-500 hover:text-white'}`}
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-[8px] mt-0.5">Library</span>
                      </button>
                      <button 
                        onClick={() => setPhoneScreen('settings')}
                        className={`flex flex-col items-center flex-1 py-1 rounded-xl transition ${phoneScreen === 'settings' ? 'text-teal-400' : 'text-slate-500 hover:text-white'}`}
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-[8px] mt-0.5">Timer</span>
                      </button>
                      <button 
                        onClick={() => setPhoneScreen('history')}
                        className={`flex flex-col items-center flex-1 py-1 rounded-xl transition ${phoneScreen === 'history' ? 'text-teal-400' : 'text-slate-500 hover:text-white'}`}
                      >
                        <History className="w-4 h-4" />
                        <span className="text-[8px] mt-0.5">Logs</span>
                      </button>
                      <button 
                        onClick={() => setPhoneScreen('favorites')}
                        className={`flex flex-col items-center flex-1 py-1 rounded-xl transition ${phoneScreen === 'favorites' ? 'text-teal-400' : 'text-slate-500 hover:text-white'}`}
                      >
                        <Star className="w-4 h-4" />
                        <span className="text-[8px] mt-0.5">Starred</span>
                      </button>
                    </div>

                    {/* Bottom Home Button indicator */}
                    <div className="w-24 h-1 bg-white/30 rounded-full mx-auto -mb-2 mt-2"></div>
                  </div>
                ) : null}

              </div>
            </div>
            
            {/* Battery status explanation alert info */}
            <div className="mt-4 bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-start gap-2.5 text-xs">
              <Info className="w-4.5 h-4.5 text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Dynamic Accents Enabled</p>
                <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                  Changing wallpaper extracts dominant patterns, immediately altering the virtual phone's theme color! Try applying other pictures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Android Studio Code Hub + Instructions (Takes 7 columns) */}
        <section className={`lg:col-span-7 flex flex-col gap-6 w-full ${activeTab !== 'simulator' ? 'block' : 'hidden lg:block'}`}>
          
          {/* Main Code View Mode */}
          {activeTab !== 'instructions' ? (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col min-h-[640px]">
              
              {/* Fake IDE Header Tabs */}
              <div className="bg-slate-950 border-b border-slate-850 px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Simulated Android IDE Path */}
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-slate-300">com.example.wallshuffle /</span>
                  <span className="text-xs font-mono font-bold text-white max-w-[210px] truncate">{selectedFile.path}</span>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={codeCategoryFilter}
                    onChange={(e) => setCodeCategoryFilter(e.target.value)}
                    className="bg-slate-900 text-xs border border-slate-800 text-slate-300 rounded-lg py-1 px-2.5 outline-none font-sans"
                  >
                    <option value="All">All Components</option>
                    <option value="Configuration">Gradle & AndroidManifest</option>
                    <option value="Data / Database">Local Storage & Room</option>
                    <option value="Worker / Scheduling">WorkManager & Services</option>
                    <option value="ViewModel & DI">Hilt & ViewModels</option>
                    <option value="UI Screens">Jetpack Compose Layouts</option>
                  </select>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg text-xs font-bold transition"
                  >
                    {copiedFileIndex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedFileIndex ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Layout splits on Large Viewports: File list left, Code panel right */}
              <div className="flex-1 flex flex-col md:flex-row min-h-[480px]">
                
                {/* Left Side: Directory Navigator */}
                <div className="w-full md:w-56 bg-slate-950 border-r border-slate-850 p-2.5 flex flex-col gap-1.5 max-h-[500px] md:max-h-none overflow-y-auto">
                  <span className="text-[10px] tracking-widest font-black uppercase text-slate-500 font-sans block mb-2 px-2.5">
                    Project Tree
                  </span>

                  {filteredFiles.map((f, i) => (
                    <button
                      key={f.path}
                      onClick={() => setSelectedFile(f)}
                      className={`w-full text-left py-2 px-3 rounded-xl text-xs font-mono flex items-center justify-between gap-1 transition ${
                        selectedFile.path === f.path 
                          ? 'bg-teal-500/10 border border-teal-500/20 text-teal-300 font-bold' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                      }`}
                    >
                      <span className="truncate block max-w-[140px]">{f.path.split('/').pop()}</span>
                      <span className="text-[8px] bg-slate-900 px-1 py-0.5 rounded text-slate-500 border border-slate-800">
                        {f.language === 'kotlin' ? 'kt' : f.language}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Right Side: Code Viewport Frame */}
                <div className="flex-1 bg-slate-900 overflow-auto relative">
                  {/* Absolute subtle background decoration */}
                  <div className="absolute right-4 top-4 opacity-5 pointer-events-none">
                    <Terminal className="w-36 h-36 text-slate-200" />
                  </div>

                  <pre className="p-6 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
                    <code>{selectedFile.content}</code>
                  </pre>
                </div>

              </div>

            </div>
          ) : (
            /* Studio Integration Guide Tab */
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl flex flex-col justify-between min-h-[640px]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-teal-500/10 rounded-2xl border border-teal-500/25">
                    <BookOpen className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Android Studio Workspace Setup Guide</h3>
                    <p className="text-xs text-slate-400">Steps to import, compile, and run WallShuffle locally</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  
                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-teal-400">1. Create Baseline Project</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Launch Android Studio (Koala/Ladybug). Choose <strong className="text-slate-300">New Project &gt; Empty Activity</strong>. Ensure package name matches: <code className="text-teal-300 font-mono">com.example.wallshuffle</code>.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-teal-400">2. Configure Gradle Dependencies</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Copy content from <strong className="text-slate-300">app/build.gradle.kts</strong>. This installs Room, Dagger Hilt context, and background automated WorkManager triggers.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-teal-400">3. Map Core Source Code</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Create packages representing: <code className="text-teal-300 font-mono">data</code>, <code className="text-teal-300 font-mono">worker</code>, <code className="text-teal-300 font-mono">ui</code>, and copy Kotlin structures sequentially. Run on your device!
                    </p>
                  </div>

                </div>

                {/* Important background restrictions alert card */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl space-y-2">
                  <h6 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Android Battery Optimization Whitelist Constraint
                  </h6>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Modern Android OS versions put background Workers to sleep if the app experiences long idle times. To safeguard reliable schedules: Ask users to toggle <strong className="text-slate-200">App Info &gt; Battery &gt; Unrestricted</strong> on their device.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-white block">Permissions Configuration Overview:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 font-mono">
                    <div className="p-2 border border-slate-900 rounded bg-slate-900/60">
                      <span className="text-teal-400 block font-semibold text-[10px] mb-0.5">READ_MEDIA_IMAGES (Api 33+)</span>
                      Required to access media from Google Gallery library.
                    </div>
                    <div className="p-2 border border-slate-900 rounded bg-slate-900/60">
                      <span className="text-teal-400 block font-semibold text-[10px] mb-0.5">RECEIVE_BOOT_COMPLETED</span>
                      Wakes up scheduler and registers alarms again on reboot.
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Guides */}
              <div className="border-t border-slate-850 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Fully optimized for Android 14 standard targets.</span>
                </div>
                
                <button
                  onClick={() => setActiveTab('code')}
                  className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  Go back to Source Code View
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* Quick Statistics Panel inside full web app */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Changes log</span>
              <span className="text-xl font-bold text-white block font-mono">{stats.totalChanges}</span>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Daily Triggers</span>
              <span className="text-xl font-bold text-white block font-mono">+{stats.dailyChanges}</span>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Most Recurring</span>
              <span className="text-[11px] font-bold text-teal-400 block truncate leading-tight pt-1 max-w-[120px] mx-auto">
                {stats.mostUsedName}
              </span>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Battery optimized</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-550/20 px-2 py-0.5 rounded-full inline-block mt-0.5">
                Active
              </span>
            </div>

          </div>

        </section>

      </main>

      {/* Aesthetic Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 WallShuffle Android Studio Sandbox. Made under Google AI Studio Build recommendations.</p>
          <div className="flex gap-4">
            <a href="#" onClick={() => setActiveTab('instructions')} className="hover:text-slate-350 hover:underline">Setup Instructions</a>
            <span>•</span>
            <a href="#" onClick={() => setActiveTab('code')} className="hover:text-slate-350 hover:underline">Kotlin Source code</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
