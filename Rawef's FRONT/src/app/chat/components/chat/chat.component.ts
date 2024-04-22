import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../../Models/ChatMessage';
import { ChatService } from '../../service/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
 
  messageInput: string = '';
  userId: string="";
  messageList: any[] = [];
  userList:any[]=[];
  selectedUserId: string = '';
  selectedUserName: string = '';
  selectedImage: File | null = null;



  constructor(private chatService: ChatService,
    private route: ActivatedRoute
    ){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.userId = params['userId']; // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
        this.chatService.joinRoom(this.userId);
        this.lisenerMessage();
        this.getConnectedUsers();
    });
  }

  sendMessage() {
  if (this.selectedUserId) {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId
    } as ChatMessage;
    this.messageInput = '';
    // Ajoutez le nouveau message à la liste existante
    this.messageList.push({ ...chatMessage, message_side: 'sender' });
    // Assurez-vous que la liste ne dépasse pas 100 messages
    if (this.messageList.length > 100) {
      this.messageList.shift(); // Supprimez le plus ancien message s'il y en a plus de 100
    }
    // Envoyez le message via le service de chat
    this.chatService.sendMessage(this.selectedUserId, chatMessage);
  } else {
    console.error('Aucun utilisateur sélectionné pour envoyer le message.');
  }
}


lisenerMessage() {
  this.chatService.getMessageSubject().subscribe((messages: any) => {
    // Merge received messages with existing message list
    this.messageList = this.messageList.concat(
      messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver'
      }))
    );
  });
}
  



  getConnectedUsers(): void {
    this.chatService.getConnectedUsers().subscribe(
      (users) => {
        this.userList = users; // Assurez-vous que la réponse de l'API est un tableau d'utilisateurs
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs connectés :', error);
      }
    );
  }

  selectUser(user: any) {
    this.selectedUserId = user.id;
    this.updateTopMenuTitle(user.nom); // Stockez l'ID de l'utilisateur sélectionné
}


  filterTable() {
    const filter = (document.getElementById('searchInput') as HTMLInputElement).value.toUpperCase();
    const users = document.querySelectorAll('.list-unstyled.chat-list li');
    users.forEach(user => {
      const name = (user.querySelector('.name') as HTMLElement).innerText.toUpperCase();
      if (name.indexOf(filter) > -1) {
        (user as HTMLElement).style.display = ''; // Convertir l'élément en HTMLElement
      } else {
        (user as HTMLElement).style.display = 'none'; // Convertir l'élément en HTMLElement
      }
    });
}

updateTopMenuTitle(userName: string) {
  this.selectedUserName = userName;
}


updateUserPresence(userId: string, isOnline: boolean) {
  const userIndex = this.userList.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    this.userList[userIndex].isOnline = isOnline;
  }
}

handleImageUpload(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedImage = file;
  }
}

// Méthode pour envoyer l'image sélectionnée
sendImage() {
  if (this.selectedImage) {
    // Créer une instance de FormData pour envoyer le fichier
    const formData = new FormData();
    formData.append('image', this.selectedImage);

    // Envoyer l'image via le service de chat
    this.chatService.sendImage(this.selectedUserId, formData);

    // Réinitialiser la sélection d'image après l'envoi
    this.selectedImage = null;
  } else {
    console.error('Aucune image sélectionnée.');
  }
}

}
