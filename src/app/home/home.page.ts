import { Component, OnInit } from '@angular/core'
import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
} from 'stream-chat-angular'

const USER_ID = 'dillion'
const API_KEY = 'qdnhm5t55ss7'
const USER_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGlsbGlvbiJ9.xehvqQfThsa01RYKaLkc1tHSxxz3G-aA8ZJTE7TUYlw'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService
  ) {
    const apiKey = API_KEY
    const userId = USER_ID
    const userToken = USER_TOKEN
    this.chatService.init(apiKey, userId, userToken)
    this.streamI18nService.setTranslation()
  }

  async ngOnInit() {
    const channel = this.chatService.chatClient.channel(
      'messaging',
      'talking-about-angular',
      {
        // add as many custom fields as you'd like
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
        name: 'Talking about Angular',
      }
    )
    await channel.create()
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'talking-about-angular' },
    })
  }
}
