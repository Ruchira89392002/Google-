const delay = time => new Promise(res => setTimeout(res, time));

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    let bot = global.db.data.settings[this.user.jid] || {};
  // Check if the message is from the "Baileys" library or if the chat has antiCall set to false.
  if (m.isBaileys) return;
  if (!bot.antiCall) return;

  // Create a message mentioning the sender of the incoming message.
  const edtr = `⚠️️ @${m.sender.split('@')[0]} ⚠️️`;

  // Define different message types and their corresponding messages.
  const messageType = {
    40: '📞 ඔබ දුරකථන call එකක් ලැබී ඇත, නමුත් ඔබ එය මග හැර ඇත.',
    41: '📹 ඔබ දුරකථන video එකක් ලැබී ඇත, නමුත් ඔබ එය මග හැර ඇත.',
    45: '📞 ඔබ group සමූහයෙට අයත් voice call එක මගහැරි ඇත.',
    46: '📹 ඔබ group සමූහයෙට අයත් voice call එක මගහැරි ඇත..'
  }[m.messageStubType];

  // If a message type is found, send a message to the chat.
  if (messageType) {
    // Send a message mentioning the sender and the message type.
   
    await this.sendMessage(m.chat, { text: `⚠️️ඔබව තහනම් කර ඇත⚠️️ + ඔබගෙ call සමූහය සැක ඇති බැවින් ඔබව බොට්🛡️ තහනම් කර ඇත`, mentions: [m.sender] });
    
   

    // Send a warning message indicating that the user has been banned, blocked, warned, and kicked.

    await delay(1000);

    // Update the user's status to banned and give them a warning.
    global.db.data.users[m.sender].banned = true;
    global.db.data.users[m.sender].warning = 1;

    // Block the user from sending messages to the bot.
   
    await this.updateBlockStatus(m.sender, "⚠️️තහනම් කර ඇත⚠️️");

    // If the message is from a group, remove the sender from the group.
    if (m.isGroup) {
      await this.groupParticipantsUpdate(m.chat, [m.sender], "⛔ඉවත්කරන්න");
    }
  } else {
    // If the message type is not recognized, log information about it.
    console.log({ messageStubType: m.messageStubType, messageStubParameters: m.messageStubParameters, type: m.messageStubType });
  }
}

export const disabled = false;
