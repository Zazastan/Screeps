# Screeps

This is my Screeps script. If you don't know what Screeps is you can find out at www.screeps.com 

How things work:


The GameAI is the class that contain all the RoomAIs that govern each owned room and carries information between owned rooms.

The RoomAI performs all the tasks of the owned room. It keeps leachRooms (rooms next to it) in memory and checks if there are any enemies them through LeachRoomSensory class. RoomAI also checks all the buildingSites if builders have nothing to do and also gets the buildings that need repair. It also spawns new creeps if needed. Lastly it executes all the affiliated creeps' and structures' code.

The creeps get arguments from their RoomAI and they use them to know what they should do. Some roles use them more than others for example miners don't have as many arguments as repairers.

Lastly the you can use screeps-profiler (https://github.com/gdborton/screeps-profiler) to have assess the CPU cost of the code.



TODO:

  -role.defender: A defensive creep
  -role.attacker: An attack type of creep
  -spawn logic enchancement: To have some kind of memory if harvesting from other leachRooms is profitable or not.
  -leachRoom repairing: automatic roadRepair to the harvesters
  -Early levels are still quite unoptimized.
  -Resource extraction and lab usage.
  -Terminal usage.
