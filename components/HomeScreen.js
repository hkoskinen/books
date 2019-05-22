import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

const sample = {
  kind: "books#volumes",
  totalItems: 1,
  items: [
    {
      kind: "books#volume",
      id: "8ngAkAEACAAJ",
      etag: "0bV2iKT03b0",
      selfLink: "https://www.googleapis.com/books/v1/volumes/8ngAkAEACAAJ",
      volumeInfo: {
        title: "Clean Architecture",
        subtitle: "A Craftsman's Guide to Software Structure and Design",
        authors: ["Robert C. Martin"],
        publisher: "Pearson Professional",
        publishedDate: "2017-09-10",
        description:
          'Building upon the success of best-sellers The Clean Coder and Clean Code, legendary software craftsman Robert C. "Uncle Bob" Martin shows how to bring greater professionalism and discipline to application architecture and design. As with his other books, Martin\'s Clean Architecture doesn\'t merely present multiple choices and options, and say "use your best judgment": it tells you what choices to make, and why those choices are critical to your success. Martin offers direct, is essential reading for every software architect, systems analyst, system designer, and software manager-- and for any programmer who aspires to these roles or is impacted by their work.',
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "0134494164"
          },
          {
            type: "ISBN_13",
            identifier: "9780134494166"
          }
        ],
        readingModes: {
          text: false,
          image: false
        },
        pageCount: 400,
        printType: "BOOK",
        categories: ["Computers"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "preview-1.0.0",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false
        },
        imageLinks: {
          smallThumbnail:
            "https://books.google.com/books/content?id=8ngAkAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          thumbnail:
            "https://books.google.com/books/content?id=8ngAkAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        language: "en",
        previewLink:
          "http://books.google.fi/books?id=8ngAkAEACAAJ&dq=isbn:9780134494166&hl=&cd=1&source=gbs_api",
        infoLink:
          "http://books.google.fi/books?id=8ngAkAEACAAJ&dq=isbn:9780134494166&hl=&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Clean_Architecture.html?hl=&id=8ngAkAEACAAJ"
      },
      saleInfo: {
        country: "FI",
        saleability: "NOT_FOR_SALE",
        isEbook: false
      },
      accessInfo: {
        country: "FI",
        viewability: "NO_PAGES",
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false
        },
        pdf: {
          isAvailable: false
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=8ngAkAEACAAJ&hl=&printsec=frontcover&source=gbs_api",
        accessViewStatus: "NONE",
        quoteSharingAllowed: false
      },
      searchInfo: {
        textSnippet:
          "As with his other books, Martin&#39;s Clean Architecture doesn&#39;t merely present multiple choices and options, and say &quot;use your best judgment&quot;: it tells you what choices to make, and why those choices are critical to your success."
      }
    }
  ]
};

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          padding: 20
        }}
      >
        <Text style={{ fontSize: 32, textAlign: "center", marginBottom: 30 }}>
          Book ISBN Reader
        </Text>
        <Button
          title="Scan book"
          onPress={() => navigate("Scanner")}
          type="outline"
          style={{ marginBottom: 20 }}
        />
        <Button
          title="List scanned books"
          onPress={() => navigate("List")}
          type="outline"
        />
        {/*<Button
          title="Show details of sample data"
          onPress={() => navigate("Details", { data: sample.items[0] })}
        /> */}
      </View>
    );
  }
}

export default HomeScreen;
