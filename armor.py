'''
Author: Jiafeng Zhou
Date: Mar 05, 2019
Email: zhoujiafeng1044@gmail.com
'''
'''
Based on 0-1 Knapsack code from https://www.geeksforgeeks.org/printing-items-01-knapsack/

'''




#!/usr/bin/python3

import numpy as np




'''
Define objects
'''

class Armor:

	def __init__(self, a, b, c, d):
		self.armorType = a;
		self.name = b;
		self.cost = c;
		self.value = d;








def printknapSack(W, inventory): 
	'''
	divide data into four groups
	'''
	helmet = [];
	leggings = [];
	chest = [];
	boots = [];
	for i in range(0,len(inventory)):
		if (inventory[i].armorType == 1):
			helmet.append(inventory[i]);
		elif (inventory[i].armorType == 2):
			leggings.append(inventory[i]);
		elif (inventory[i].armorType == 3):
			chest.append(inventory[i]);
		elif (inventory[i].armorType == 4):
			boots.append(inventory[i]);

#use for store intermediate results
	K = [[0 for w in range(W + 1)] for k in range(5 + 1)];
              

	length = 0;
	val = [];
	wt = [];
	nm = [];
	tp = [];
	maximum = [0 for x in range(0,4)];
	index = 0;
	for y in range(0,4):#for every kind of armors
		for k in range(5 + 1): 
			if k == 1:
				length = len(helmet);
				val = [helmet[x].value for x in range(0,len(helmet))];
				wt = [helmet[x].cost for x in range(0,len(helmet))];
			elif k == 2:
				length = len(leggings);
				val = [leggings[x].value for x in range(0,len(leggings))];
				wt = [leggings[x].cost for x in range(0,len(leggings))];
			elif k == 3:
				length = len(chest);
				val = [chest[x].value for x in range(0,len(chest))];
				wt = [chest[x].cost for x in range(0,len(chest))];
			elif k == 4:
				length = len(boots);
				val = [boots[x].value for x in range(0,len(boots))];
				wt = [boots[x].cost for x in range(0,len(boots))];
			elif k == 5:
				if y == 0:
					length = len(helmet);
					val = [helmet[x].value for x in range(0,len(helmet))];
					wt = [helmet[x].cost for x in range(0,len(helmet))];
				elif y == 1:
					length = len(leggings);
					val = [leggings[x].value for x in range(0,len(leggings))];
					wt = [leggings[x].cost for x in range(0,len(leggings))];
				elif y == 2:
					length = len(chest);
					val = [chest[x].value for x in range(0,len(chest))];
					wt = [chest[x].cost for x in range(0,len(chest))];
				elif y == 3:
					length = len(boots);
					val = [boots[x].value for x in range(0,len(boots))];
					wt = [boots[x].cost for x in range(0,len(boots))];


			for w in range(W + 1): #for crowns
				for i in range(0,length):#for every elements of certain armor type
					if k == 0 or w == 0: 
						K[k][w] = 0
					elif wt[i] <= w: 
						K[k][w] = max(val[i]  
							+ K[k - 1][w - wt[i]], 
								K[k - 1][w]) 
					else: 
						K[k][w] = K[k - 1][w]
		maximum[y] = K[k][w];
		K = [[0 for w in range(W + 1)] for k in range(5 + 1)];







#find maximum one
	index = maximum.index(max(maximum));
	K = [[0 for w in range(W + 1)] for k in range(5 + 1)];

	for k in range(5 + 1): 
			if k == 1:
				length = len(helmet);
				val = [helmet[x].value for x in range(0,len(helmet))];
				wt = [helmet[x].cost for x in range(0,len(helmet))];
			elif k == 2:
				length = len(leggings);
				val = [leggings[x].value for x in range(0,len(leggings))];
				wt = [leggings[x].cost for x in range(0,len(leggings))];
			elif k == 3:
				length = len(chest);
				val = [chest[x].value for x in range(0,len(chest))];
				wt = [chest[x].cost for x in range(0,len(chest))];
			elif k == 4:
				length = len(boots);
				val = [boots[x].value for x in range(0,len(boots))];
				wt = [boots[x].cost for x in range(0,len(boots))];
			elif k == 5:
				if index == 0:
					length = len(helmet);
					val = [helmet[x].value for x in range(0,len(helmet))];
					wt = [helmet[x].cost for x in range(0,len(helmet))];
				elif index == 1:
					length = len(leggings);
					val = [leggings[x].value for x in range(0,len(leggings))];
					wt = [leggings[x].cost for x in range(0,len(leggings))];
				elif index == 2:
					length = len(chest);
					val = [chest[x].value for x in range(0,len(chest))];
					wt = [chest[x].cost for x in range(0,len(chest))];
				elif index == 3:
					length = len(boots);
					val = [boots[x].value for x in range(0,len(boots))];
					wt = [boots[x].cost for x in range(0,len(boots))];


			for w in range(W + 1): 
				for i in range(0,length):
					if k == 0 or w == 0: 
						K[k][w] = 0
					elif wt[i] <= w: 
						K[k][w] = max(val[i]  
							+ K[k - 1][w - wt[i]], 
								K[k - 1][w]) 
					else: 
						K[k][w] = K[k - 1][w]



#file output
	f = open("result.txt","w");


  
# stores the result of Knapsack 
	res = K[5][W];
	totalCost = 0;

      #traceback
	w = W 
	for k in range(5, 0, -1): 
		if res <= 0: 
			break
        # either the result comes from the 
        # top (K[i-1][w]) or from (val[i-1] 
        # + K[i-1] [w-wt[i-1]]) as in Knapsack 
        # table. If it comes from the latter 
        # one/ it means the item is included. 
		if k == 1:
			length = len(helmet);
			tp = [helmet[x].armorType for x in range(0,len(helmet))];
			nm = [helmet[x].name for x in range(0,len(helmet))];
			val = [helmet[x].value for x in range(0,len(helmet))];
			wt = [helmet[x].cost for x in range(0,len(helmet))];
		elif k == 2:
			length = len(leggings);
			tp = [leggings[x].armorType for x in range(0,len(leggings))];
			nm = [leggings[x].name for x in range(0,len(leggings))];
			val = [leggings[x].value for x in range(0,len(leggings))];
			wt = [leggings[x].cost for x in range(0,len(leggings))];
		elif k == 3:
			length = len(chest);
			tp = [chest[x].armorType for x in range(0,len(chest))];
			nm = [chest[x].name for x in range(0,len(chest))];
			val = [chest[x].value for x in range(0,len(chest))];
			wt = [chest[x].cost for x in range(0,len(chest))];
		elif k == 4:
			length = len(boots);
			tp = [boots[x].armorType for x in range(0,len(boots))];
			nm = [boots[x].name for x in range(0,len(boots))];
			val = [boots[x].value for x in range(0,len(boots))];
			wt = [boots[x].cost for x in range(0,len(boots))];
		elif k == 5:
			if index == 0:
				length = len(helmet);
				tp = [helmet[x].armorType for x in range(0,len(helmet))];
				nm = [helmet[x].name for x in range(0,len(helmet))];
				val = [helmet[x].value for x in range(0,len(helmet))];
				wt = [helmet[x].cost for x in range(0,len(helmet))];
			elif index == 1:
				length = len(leggings);
				tp = [leggings[x].armorType for x in range(0,len(leggings))];
				nm = [leggings[x].name for x in range(0,len(leggings))];
				val = [leggings[x].value for x in range(0,len(leggings))];
				wt = [leggings[x].cost for x in range(0,len(leggings))];
			elif index == 2:
				length = len(chest);
				tp = [chest[x].armorType for x in range(0,len(chest))];
				nm = [chest[x].name for x in range(0,len(chest))];
				val = [chest[x].value for x in range(0,len(chest))];
				wt = [chest[x].cost for x in range(0,len(chest))];
			elif index == 3:
				length = len(boots);
				tp = [boots[x].armorType for x in range(0,len(boots))];
				nm = [boots[x].name for x in range(0,len(boots))];
				val = [boots[x].value for x in range(0,len(boots))];
				wt = [boots[x].cost for x in range(0,len(boots))];


		for i in range(0,length):
			if res == K[k - 1][w]: 
				continue
			elif K[k][w] == val[i]+K[k-1][w-wt[i]]: 
  
            	# This item is included. 
				typeStr = "";
				if (tp[i] == 1):
					typeStr = "Helmet";
				elif (tp[i] == 2):
					typeStr = "Leggings";
				elif (tp[i] == 3):
					typeStr = "Chest";
				elif (tp[i] == 4):
					typeStr = "Boots";
				print("Selected Item:");
				f.write("Selected Item:\n");
				print("Type: ",typeStr);
				f.write("Type: ");
				f.write(typeStr);
				f.write("\n");
				print("Name: ",nm[i]);
				f.write("Name: ");
				f.write(nm[i]);
				f.write("\n");
				print("Value: ",val[i]);
				f.write("Value: ");
				f.write(str(val[i]));
				f.write("\n");
				print("Cost: ",wt[i]);
				f.write("Cost: ");
				f.write("\n");
				f.write(str(wt[i]));
				totalCost += wt[i];
              
            	# Since this weight is included 
            	# its value is deducted 
				res = res - val[i] 
				w = w - wt[i] 
 
	print("Total Cost: ",totalCost);
	f.write("Total Cost: ");
	f.write(str(totalCost));
	f.write("\n");
	print("Total Value: ",K[5][W]);
	f.write("Total Value: ");
	f.write(str(K[5][W]));
	f.write("\n");
	f.close();










# construct data
inventory = [];

#Helmet = 1, Leggings = 2, Chest = 3, Boots = 4
inventory.append(Armor(1,'Serpentine Cruz Headpiece',90,23));
inventory.append(Armor(2,'Famed Pon Leggings',87,22));
inventory.append(Armor(2,'Ursine Trousers',78,18));
inventory.append(Armor(1,'Keeton Mask',77,24));
inventory.append(Armor(2,'Wolven Shinguards',75,15));
inventory.append(Armor(2,"Hansen's Breeches",69,17));
inventory.append(Armor(1,'Feline Visor',68,16));
inventory.append(Armor(3,'Armor de Jandro',67,22));
inventory.append(Armor(3,'Chestpiece of Vachon',64,23));
inventory.append(Armor(4,'Diamond Boots',64,18));
inventory.append(Armor(2,'Griffin Pants',62,11));
inventory.append(Armor(3,'Kaer Morhen Armor',62,21));
inventory.append(Armor(1,'Ornate Helmet of Cagampan',60,16));
inventory.append(Armor(3,'Cured Leather Chestpiece',59,20));
inventory.append(Armor(2,'Tanned Leg Protection',59,15));
inventory.append(Armor(3,"Smith's Plated Chestguard",58,10));
inventory.append(Armor(3,'Dented Plate Armor',57,19));
inventory.append(Armor(2,'Manticore Braces',56,12));
inventory.append(Armor(3,'Jeweled Drake Tunic',55,19));
inventory.append(Armor(3,"Ginger's Gilded Armor",54,18));
inventory.append(Armor(1,'Offner Protector',54,15));
inventory.append(Armor(2,'Mail Emares Leggings',53,14));
inventory.append(Armor(4,'Steel Boots',52,14));
inventory.append(Armor(4,"Tate's Spiked Cleats",52,20));
inventory.append(Armor(3,'Garcia Guard',50,17));
inventory.append(Armor(1,'Leather Helmet',49,13));
inventory.append(Armor(2,'Woven Leggings',47,11));
inventory.append(Armor(1,"Sligar's Noggin Protector",46,12));
inventory.append(Armor(2,'Silken Pants',45,10));
inventory.append(Armor(1,'Glass Bowl',44,12));

inventory.append(Armor(2,'Tattered Shorts',42,13));
inventory.append(Armor(4,'Leather Lunde Shoes',35,7));
inventory.append(Armor(4,'Cloth Shoes',33,5));



W = 300

      
printknapSack(W, inventory) 






