const { Telegraf } = require('telegraf');
const tf = require('@tensorflow/tfjs-node');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token from BotFather
const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');

// Example TensorFlow.js model (you can load a pre-trained model or build one)
async function makePrediction(input) {
  // Simple model for demonstration purposes
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
  const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

  // Train the model
  await model.fit(xs, ys, { epochs: 10 });

  // Use the model to make a prediction
  const prediction = model.predict(tf.tensor2d([input], [1, 1]));
  return prediction.dataSync()[0]; // Return the prediction
}

// Bot command to use TensorFlow.js prediction
bot.command('predict', async (ctx) => {
  const input = parseFloat(ctx.message.text.split(' ')[1]);
  if (isNaN(input)) {
    ctx.reply('Please provide a valid number!');
  } else {
    const result = await makePrediction(input);
    ctx.reply(`Prediction for input ${input}: ${result}`);
  }
});

// Start the bot
bot.launch();
console.log('Bot is running...');
