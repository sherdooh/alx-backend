#!/usr/bin/python3
"""Creating the BasicCache class inheriting from BaseCaching"""


BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ Defining BasicCache """

    def put(self, key, item):
        """ Assign the item to the dictionary """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ Return value associated with the given key """
        return self.cache_data.get(key)

