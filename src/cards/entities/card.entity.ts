import { Material } from '../../material/entities/material.entity';

export class Card {

id: number;
title: String;
description: String;
img_url: String;
hidden: Boolean;
subtitle: String;
material: Material[];

constructor(id: number, title: String, description: String,img_url: String,hidden: Boolean,subtitle: String,material: Material[]){
    this.id = id;
    this.title = title;
    this.description = description;
    this.img_url = img_url;
    this.material = material;
    
}
}
