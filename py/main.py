import string
import random

upper_char = string.ascii_uppercase
lower_char = string.ascii_lowercase
digits = string.digits
symbols = string.punctuation

characters = [upper_char, lower_char, digits, symbols]

personal_info = ["Joseph", "Oliva", "Bataller", "September 30, 2004"]
credentials = ["Seph", "Bataller-202305490"]

def encrypt_password(password, key):
    encrypted_password = ""
    for i in range(len(password)):
        for char in characters:
            if password[i] in char:
                indices = [char.index(password[i]), char.index(key[i])]
                sum_of_index = sum(indices)
                if sum_of_index >= len(char):
                    index = max(indices) %  min(indices)
                    encrypted_password += char[index]
                else:
                    encrypted_password += char[indices[0] + indices[1]]
        
    random.shuffle(list(encrypted_password))
    
    return encrypted_password


def generate_key(password):
    generated_key = ""
    for i in password: 
        for char in characters:
            if i in char:
                generated_key += random.choice(char)
    
    return generated_key

while True:
    username = input("\nEnter your username: ")
    password = input("Enter your password: ")

    if username == credentials[0]:
        if password == credentials[1]:
            generated_key = generate_key(password)
            encrypted_password =  encrypt_password(password, generated_key)
            print(f'\nUsername: {username}\nEncrypted Password: {encrypted_password}\nGenerated Key: {generated_key}\n\nFirst Name: {personal_info[0]}\nMiddle Name: {personal_info[1]}\nLast Name: {personal_info[2]}\nDate of Birth: {personal_info[3]}\n')
        else:
            break
    else: print(f'\nUsername {username} does not exist\n')