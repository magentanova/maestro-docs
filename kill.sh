if [ "$1" = "mongo" ]
	then
		if pgrep mongo
		  then 
		    kill $(pgrep mongo)
		    echo "turning off mongo" 
		  else 
		    echo "mongo was not running"
		fi
	else 
		if pgrep node
		  then 
		    kill $(pgrep node)
		    echo "stopping all node processes" 
		  else 
		    echo "no node processes running"
		fi
fi