const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const openai = new OpenAI({
});
const assistant = "asst_hxWwX7qqVLujfQi5iPI6VzkC";
const dataFilePath = path.join(__dirname, "data.json"); // Absolute path to data.json
const threads = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

async function createThread() {
  const thread = await openai.beta.threads.create();
  threads.push(thread.id);
  fs.writeFileSync(dataFilePath, JSON.stringify(threads), "utf8"); // Use absolute path
}

async function deleteThread(thread_id = threads[0]) {
  const response = await openai.beta.threads.del(thread_id);
  console.log(response);
  for (let i = 0; i < threads.length; i++) {
    if (threads[i] === thread_id) threads.splice(i, 1);
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(threads), "utf8"); // Use absolute path
}

async function deleteThreads(start, end) {
  for (let i = start; i < end; i++) {
    await deleteThread(threads[i]);
  }
}

async function sendMessage(
  message_text,
  thread_id = threads[threads.length - 1],
  assistant_id = assistant
) {
  const message = await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content: message_text,
  });
  let run = await openai.beta.threads.runs.create(thread_id, {
    assistant_id: assistant_id,
  });
  while(run.status != "completed" && run.status != "cancelled" && run.status != "failed" && run.status != "expired"){
    run = await openai.beta.threads.runs.retrieve(thread_id, run.id);
  }
  const messages = await openai.beta.threads.messages.list(thread_id);
  return messages.data[0].content[0].text.value;
}

async function getMessages(thread_id = threads[threads.length - 1]) {
  const messages = await openai.beta.threads.messages.list(thread_id);
  return messages;
}

module.exports = {
    getMessages,
    sendMessage,
};
