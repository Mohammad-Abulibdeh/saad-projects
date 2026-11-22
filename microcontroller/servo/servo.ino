#include <driver/i2s.h>

#define I2S_WS   25
#define I2S_SD   33
#define I2S_SCK  26

#define LED       2
#define SAMPLES   128
#define THRESHOLD 50

int32_t buffer[SAMPLES];

void setup() {
  Serial.begin(115200);
  pinMode(LED, OUTPUT);

  i2s_config_t config = {
    .mode             = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
    .sample_rate      = 16000,
    .bits_per_sample  = I2S_BITS_PER_SAMPLE_32BIT,
    .channel_format   = I2S_CHANNEL_FMT_ONLY_LEFT,
    .communication_format = I2S_COMM_FORMAT_I2S,
    .intr_alloc_flags = 0,
    .dma_buf_count    = 8,
    .dma_buf_len      = 128
  };

  i2s_pin_config_t pins = {
    .bck_io_num   = I2S_SCK,
    .ws_io_num    = I2S_WS,
    .data_out_num = I2S_PIN_NO_CHANGE,  // ✅ بدلاً من -1
    .data_in_num  = I2S_SD
  };

  esp_err_t err;

  err = i2s_driver_install(I2S_NUM_0, &config, 0, NULL);
  if (err != ESP_OK) {
    Serial.printf("خطأ في تثبيت I2S driver: %d\n", err);
    while (true);  // إيقاف التنفيذ عند الخطأ
  }

  err = i2s_set_pin(I2S_NUM_0, &pins);
  if (err != ESP_OK) {
    Serial.printf("خطأ في ضبط I2S pins: %d\n", err);
    while (true);
  }

  Serial.println("I2S جاهز ✅");
}

void loop() {
  size_t bytes_read = 0;

  esp_err_t err = i2s_read(I2S_NUM_0, buffer, sizeof(buffer), &bytes_read, portMAX_DELAY);

  // التحقق من صحة القراءة
  if (err != ESP_OK || bytes_read < sizeof(buffer)) {
    Serial.println("خطأ في قراءة I2S");
    return;
  }

  long sum = 0;

  for (int i = 0; i < SAMPLES; i++) {
    int32_t sample = buffer[i] >> 14;           // ✅ تقليل الحجم أولاً
    sum += (sample < 0) ? -sample : sample;     // ✅ قيمة مطلقة آمنة
  }

  int level = sum / SAMPLES;

  Serial.println(level);

  digitalWrite(LED, level > THRESHOLD ? HIGH : LOW);
}