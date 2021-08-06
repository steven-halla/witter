import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import Tweet from "../Tweet";
import { API, graphqlOperation} from "aws-amplify";
import { listTweets } from "../../graphql/queries";

const Feed = () => {

  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTweets = async () => {
    setLoading(true);
    try{
      const tweetData = await API.graphql(graphqlOperation(listTweets));
      setTweets(tweetData.data.listTweets.items);
    }catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect( () => {

    fetchTweets();
  }, [])

  return (
      <View style={{ width: '100%' }}>
        <FlatList
          data={tweets}
          renderItem={({ item }) => <Tweet tweet={item} />}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={fetchTweets}
        />
      </View>
    );
};

export default Feed;
